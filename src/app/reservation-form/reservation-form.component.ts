import { Reservation } from './../reservation.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  date = new FormControl(new Date());
  time = new FormControl('');
  nbrOfPeople = new FormControl();

  constructor() {}

  createReservation(): Reservation {
    return {
      date: this.date.value,
      time: this.time.value,
      nbrOfPeople: this.nbrOfPeople.value
    };
  }
}
