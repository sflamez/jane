import { Appointment } from './../resengo/model/appointment.model';
import { Status } from '../status.model.enum';
import { ResengoService } from '../resengo/resengo.service';
import { Availability } from '../availability.model';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FlowState } from '../resengo/model/flowState.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  @Input() availabilities: Availability[];

  @Input() flowState: FlowState;

  @Output() appointment = new EventEmitter<Appointment>();

  constructor(private resengo: ResengoService) {}

  isAvailable(availability: Availability): boolean {
    return availability.availabilityStatus === Status.AVAILABLE;
  }

  initReservation(availability: Availability) {
    this.flowState.ArrivalDate = availability.date;
    this.flowState.ArrivalDateTime = availability.time;
    this.resengo.initReservation(this.flowState).subscribe(flowState => (this.flowState = flowState));
  }

  makeReservation() {
    // this.flowState.ActiveStepId = 103;
    // this.flowState.StatusID = 20;
    this.flowState.AcceptedPrivacyConditions = true;
    this.flowState.AcceptedTerms = true;
    this.flowState.TitleID = 1;
    this.flowState.NOParkings = 0;
    this.flowState.Creditcard = { brand: 'VISA', cvc: '296', expiryMonth: 10, expiryYear: 2021, number: '4236085187393425' };
    this.resengo.makeReservation(this.flowState).subscribe(appointment => this.appointment.emit(appointment));
  }

  flowStateJson(): string {
    return JSON.stringify(this.flowState);
  }
}
