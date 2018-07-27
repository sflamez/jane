import { Appointment } from '../resengo/model/appointment.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  styleUrls: ['./reservation-confirmation.component.css']
})
export class ReservationConfirmationComponent {
  @Input() appointment: Appointment;

  constructor() {}

}
