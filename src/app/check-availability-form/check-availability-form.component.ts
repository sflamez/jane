import { Availability } from './../availability.model';
import { Status } from '../status.model.enum';
import { Subscription } from 'rxjs';
import { ResengoService } from '../resengo/resengo.service';
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

  foundAvailabilities: boolean;
  @Output() availabilities = new EventEmitter<Availability[]>();

  constructor(private resengo: ResengoService) {
    const today = new Date();
    const month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    this.date.setValue(today.getFullYear() + '-' + month + '-' + day);
    this.nbrOfPeople.setValue('4');
    this.time.setValue('1508');
  }

  checkAvailability() {
    this.availabilities.emit([]);

    const availabilityToCheck: Availability = {
      date: this.date.value,
      time: this.time.value,
      nbrOfPeople: this.nbrOfPeople.value
    };

    this.resengo.getAvailability(availabilityToCheck)
       .subscribe(res => {
         const avs = res
           .map(a => this.completeAvailability(a, availabilityToCheck.date, availabilityToCheck.nbrOfPeople))
           .filter(a => a.availabilityStatus === Status.AVAILABLE);
           this.foundAvailabilities = avs.length > 0;
           this.availabilities.emit(avs);
        });
  }

  private completeAvailability(availability: Availability, date: string, nbrOfPeople: number): Availability {
    availability.date = date;
    availability.nbrOfPeople = nbrOfPeople;
    return availability;
}

}
