import { User } from './user.model';
import { ResengoService } from './resengo/resengo.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from './reservation.model';
import { Availability } from './availability.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reservation system for The Jane';

  user: User;

  availabilities: Availability[];

  constructor(private resengo: ResengoService) {}

  authenticate() {
    console.log('authenticating');
    this.resengo.authenticate().subscribe(u => (this.user = u));
  }

  onReservation(reservation: Reservation) {
    this.resengo.getAvailability(reservation).subscribe(a => (this.availabilities = a));
  }

  initReservation(availability: Availability) {
    this.resengo.initReservation().subscribe(res => res.flowState);
  }
}
