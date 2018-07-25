import { Availability } from '../availability.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-check-availability-form',
  templateUrl: './check-availability-form.component.html',
  styleUrls: ['./check-availability-form.component.css']
})
export class CheckAvailabilityFormComponent {
  date = new FormControl();
  time = new FormControl();
  nbrOfPeople = new FormControl();

  @Output() availabilityCheck = new EventEmitter<Availability>();

  constructor() {
    const today = new Date();
    const month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    this.date.setValue(today.getFullYear() + '-' + month + '-' + day);
    this.nbrOfPeople.setValue('4');
    this.time.setValue('1508');
  }

  checkAvailability() {
    this.availabilityCheck.emit({
      date: this.date.value,
      time: this.time.value,
      nbrOfPeople: this.nbrOfPeople.value
    });
  }
}
