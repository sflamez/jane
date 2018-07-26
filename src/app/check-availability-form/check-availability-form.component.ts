import { Observable, of } from 'rxjs';
import { ResengoService } from './../resengo/resengo.service';
import { Availability } from '../availability.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, catchError, retry, map } from 'rxjs/operators';

@Component({
  selector: 'app-check-availability-form',
  templateUrl: './check-availability-form.component.html',
  styleUrls: ['./check-availability-form.component.css']
})
export class CheckAvailabilityFormComponent {
  date = new FormControl();
  time = new FormControl();
  nbrOfPeople = new FormControl();

  @Output() availability = new EventEmitter<Availability>();

  constructor(private resengo: ResengoService) {
    const today = new Date();
    const month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    this.date.setValue(today.getFullYear() + '-' + month + '-' + day);
    this.nbrOfPeople.setValue('4');
    this.time.setValue('1508');
  }

  checkAvailability() {
    const availabilityCheck = this.resengo.getAvailability({
      date: this.date.value,
      time: this.time.value,
      nbrOfPeople: this.nbrOfPeople.value
    }).pipe(
      retry(),
      map(this.handleAvailability),
      catchError(err => of([]))
    );
    availabilityCheck.subscribe({
      next(x) { console.log('data: ' + x); },
      error(err) { console.error('errors already caught... will no longer run'); }
    });
  }

  private handleAvailability(availabilities: Availability[]) {
    console.log(availabilities);
    if (!availabilities.length) {
      throw new Error('no availabilities');
    }
    if (availabilities.length === 1 && availabilities[0].availabilityStatus === Status.NOT_YET_AVAILABLE) {
      console.warn('Not YET Available, retrying...');
      throw new Error('no availabilities');
    }
    return availabilities;
  }
}
