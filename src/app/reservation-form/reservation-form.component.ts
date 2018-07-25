import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FlowState } from '../resengo/model/flowState.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  @Input() flowState: FlowState;

  constructor() {}

  makeReservation() {}
}
