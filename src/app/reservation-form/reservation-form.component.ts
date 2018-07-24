import { Reservation } from './../reservation.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  date = new FormControl(Date.now());
  time = new FormControl('');
  nbrOfPeople = new FormControl('4');

  @Output() reservation = new EventEmitter<Reservation>();

  constructor() {}

  createReservation() {
    this.reservation.emit({
      date: new Date(this.date.value),
      time: this.time.value,
      nbrOfPeople: this.nbrOfPeople.value
    });
  }
}
