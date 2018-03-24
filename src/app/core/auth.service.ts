import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface Note {
  content: string;
  hearts: number;
  id?: any;
}

interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
  favoriteColor?: string;
}


@Injectable()
export class AuthService {

  user: Observable<User>;
  notes: Observable<Note[]>;
  notesCollection: AngularFirestoreCollection<Note>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) 
  {

    this.notesCollection = this.afs.collection('notes');
    this.notes = this.notesCollection.valueChanges();

    this.user = this.afAuth.authState
      .switchMap(user => {
          if (user){
            return this.afs.doc<User>('users/${user.uid}').valueChanges();
          } else {
            return Observable.of(null);
          }
    })

  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {this.updateUserData(credential.user)})
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}');
    const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoUrl
    }
    return userRef.set(data);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}

