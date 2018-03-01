import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { AppRoutingModule } from '../app-routing.module';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutId: string;
  goals: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService) {
//    this.route.params.subscribe(r => this.aboutId = r.id);
  }

  ngOnInit() {
    this.route.params.subscribe(r => this.aboutId = r.id);
    this._data.goal.subscribe(r => this.goals = r);
  }

  sendMeHome() {
    this.router.navigate(['']);
    return false;
  }
}
