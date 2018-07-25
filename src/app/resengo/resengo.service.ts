import { User } from '../user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlowState } from './model/flowState.model';
import { UserService } from '../user.service';
import { Availability } from '../availability.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResengoService {
  private login_url = 'https://cloudapi.resengo.com';
  private url = 'https://api.resengo.com/v2/';
  private companyId = 1036629;

  private flowId = 101;

  private flowState: FlowState;

  constructor(private http: HttpClient, private userService: UserService) {}

  login() {
    const body = {
      login: 'sem.flamez@gmail.com',
      password: '46jKEuA*vs!Z',
      type: 1
    };
    this.http.post<User>(this.login_url + '/Authentication', body).subscribe(u => this.userService.setUser(u));
  }

  getAvailability(availabilityCheck: Availability): Observable<Availability[]> {
    const date = new Date(availabilityCheck.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const url = this.url + `company/${this.companyId}/flow/${this.flowId}/availability/${year}/${month}/${day}`;
    return this.http.get<Availability[]>(url, this.options(availabilityCheck));
  }

  initFlowState(): Observable<FlowState> {
    const url = this.url + `company/${this.companyId}/flow/${this.flowId}/initialstepconfiguration`;
    return this.http.get<FlowState>(url, this.options());
  }

  initReservation(flowState: FlowState): Observable<FlowState> {
    const url = this.url + `company/${this.companyId}/flow/${this.flowId}/initialreservation`;
    return this.http.get<FlowState>(url, this.options());
  }

  makeReservation(flowState: FlowState) {
    const url = this.url + `company/${this.companyId}/flow/${this.flowId}/reservation`;
    return this.http.post<FlowState>(url, this.options());
  }

  private options(availabilityCheck?: Availability) {
    const headers = new HttpHeaders({ Authorization: 'bearer ' + this.userService.getUser().token });
    return { headers: headers, params: this.params(availabilityCheck) };
  }

  private params(availabilityCheck?: Availability): HttpParams {
    let params = new HttpParams()
      .set('aid', '1')
      .set('cid', '745')
      .set('cacid', '1')
      .set('rn_partnerid', '51')
      .set('scid', '285')
      .set('flowID', '101');
    if (availabilityCheck) {
      params = params
        .set('NOPersons', availabilityCheck.nbrOfPeople + '')
        .set('Date', new Date(availabilityCheck.date).toLocaleDateString())
        .set('categoryId', availabilityCheck.time);
    }
    return params;
  }
}
