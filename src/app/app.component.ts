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

  availabilities: Availability[];
  flowState: FlowState;

  constructor(private resengo: ResengoService, private userService: UserService) {}

  ngOnInit() {
    this.resengo.login().subscribe(u => {
      this.userService.setUser(u);
      this.resengo.initFlowState().subscribe(fs => (this.flowState = fs));
    });
  }

  loggedIn(): boolean {
    return this.userService.getUser() !== undefined;
  }

  onAvailabilities(availabilities: Availability[]) {
    console.log('AppComponent received availabilities');
    this.availabilities = availabilities;
  }
}
