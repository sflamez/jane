import { Status } from '../status.model.enum';
import { of, interval, Subscription } from 'rxjs';
import { ResengoService } from '../resengo/resengo.service';
import { Availability } from '../availability.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, retry, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-check-availability-form',
  templateUrl: './check-availability-form.component.html',
  styleUrls: ['./check-availability-form.component.css']
})
export class CheckAvailabilityFormComponent {
  date = new FormControl();
  time = new FormControl();
  nbrOfPeople = new FormControl();

  availabilityCheckSubscription: Subscription;

  checking = false;
  foundAvailabilities = false;
  count = 0;
  @Output() availabilities = new EventEmitter<Availability[]>();

  constructor(private resengo: ResengoService) {
    const today = new Date();
    const month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    const date = '2018-10-27';
    this.date.setValue(date);
    this.nbrOfPeople.setValue('4');
    this.time.setValue('1508');
  }

  checkAvailability() {
    this.availabilities.emit([]);
    this.checking = true;
    const availabilityCheck = this.resengo
      .getAvailability({
        date: this.date.value,
        time: this.time.value,
        nbrOfPeople: this.nbrOfPeople.value
      })
      .pipe(
        map(res => {
          this.count++;
          console.log(res);
          if (!res.length) {
            throw new Error('no availabilities');
          }
          if (res.length === 1 && res[0].availabilityStatus === Status.NOT_YET_AVAILABLE) {
            throw new Error('Not YET Available, retrying...');
          }
          this.availabilities.emit(res);
          this.checking = false;
          return res;
        }),
        retry(10000),
        catchError(err => of([]))
      );

    this.availabilityCheckSubscription = availabilityCheck.subscribe({
      next(x) {
        console.log('data: ' + x);
      },
      error(err) {
        console.error('errors already caught... will no longer run');
      }
    });
  }

  stopChecking() {
    this.availabilityCheckSubscription.unsubscribe();
    this.checking = false;
    this.count = 0;
  }
}
