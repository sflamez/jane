import { UserService } from './user.service';
import { ResengoService } from './resengo/resengo.service';
import { Component, OnInit } from '@angular/core';
import { Availability } from './availability.model';
import { FlowState } from './resengo/model/flowState.model';
import { Status } from './status.model.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reservation system for The Jane';

  availability: Availability;
  availabilities: Availability[];
  flowState: FlowState;

  constructor(private resengo: ResengoService, private userService: UserService) {}

  authenticate() {
    this.resengo.login();
  }

  onAvailabilityCheck(availabilityCheck: Availability) {
    this.availability = availabilityCheck;
    this.checkAvailability();
  }

  checkAvailability() {
    this.resengo.getAvailability(this.availability).subscribe(this.handleAvailability);
  }

  private handleAvailability(availabilities: Availability[]) {
    console.log(availabilities);
    if (!availabilities.length) {
      console.error('no availabilities');
    }
    if (availabilities.length === 1) {
      console.log('availabilityStatus = ' + availabilities[0].availabilityStatus);
      console.log(availabilities[0].availabilityStatus === Status.NOT_YET_AVAILABLE);
      console.warn('Not YET Available, retrying...');
      this.checkAvailability();
      return;
    }
    this.availabilities = availabilities;
  }

  initReservation(availability: Availability) {
    this.flowState.ArrivalDate = availability.date;
    this.flowState.ArrivalDateTime = availability.time;
    this.resengo.initReservation(this.flowState).subscribe(flowState => (this.flowState = flowState));
  }

  makeReservation() {
    this.flowState.TitleID = 1;
    this.flowState.NOParkings = 0;
    this.flowState.Creditcard = { brand: 'VISA', cvc: '296', expiryMonth: 10, expiryYear: 2021, number: '4236085187393425' };
    this.resengo.makeReservation(this.flowState);
  }

  isAvailable(availability: Availability): boolean {
    return availability.availabilityStatus === Status.AVAILABLE;
  }
}
