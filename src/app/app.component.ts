import { Appointment } from './resengo/model/appointment.model';
import { UserService } from './user.service';
import { ResengoService } from './resengo/resengo.service';
import { Component, OnInit } from '@angular/core';
import { Availability } from './availability.model';
import { FlowState } from './resengo/model/flowState.model';
import { Status } from './status.model.enum';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reservation system for The Jane';

  loggedIn = false;
  availabilities: Availability[];
  flowState: FlowState;

  appointment: Appointment;

  constructor(private resengo: ResengoService, private userService: UserService) {}

  ngOnInit() {
    this.resengo.login().subscribe(u => {
      this.userService.setUser(u);
      this.resengo.initFlowState().subscribe(res => {
        this.flowState = res.flowState;
        this.loggedIn = true;
      });
    });
  }

  onAvailabilities(availabilities: Availability[]) {
    console.log('AppComponent received availabilities');
    this.availabilities = availabilities;
  }

  onAppointment(appointment: Appointment) {
    this.appointment = appointment;
  }

  flowStateString(): string {
    return JSON.stringify(this.flowState);
  }

}
