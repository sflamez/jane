import { User } from './user.model';
import { ResengoService } from './resengo/resengo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Reservation system for The Jane';

  user: User;

  constructor(private resengo: ResengoService) { }

  authenticate() {
    console.log('authenticating');
    this.resengo.authenticate().subscribe(u => this.user = u);
  }

}
