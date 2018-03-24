import { Component, OnInit } from '@angular/core';
import { AuthService} from './core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'app';

  constructor(db: AngularFirestore){}

  ngOnInit() {
  }
}
