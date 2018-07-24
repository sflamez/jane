import { Availability } from './../availability.model';
import { User } from './../user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from '../reservation.model';
import { FlowState } from './model/flowState.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResengoService {
  private login_url = 'https://cloudapi.resengo.com';
  private url = 'https://api.resengo.com/v2/';
  private companyId = 1036629; // 553;

  private flowId = 101;

  user: Observable<User>;

  constructor(private http: HttpClient) {}

  authenticate(): Observable<User> {
    const body = {
      login: 'sem.flamez@gmail.com',
      password: '46jKEuA*vs!Z',
      type: 1
    };
    this.user = this.http.post<User>(this.login_url + '/Authentication', body);
    return this.user;
  }

  initBookingFlow() {
    // this.http.get(this.url + '/pf');
  }

  getAvailability(reservation: Reservation): Observable<Availability[]> {
    const year = reservation.date.getFullYear();
    const month = reservation.date.getMonth() + 1;
    const day = reservation.date.getDate();
    const url = this.url + `company/${this.companyId}/flow/${this.flowId}/availability/${year}/${month}/${day}`;
    const options = { params: this.params(reservation) };
    console.log('Options = ' + JSON.stringify(options));
    return this.http.get<Availability[]>(url, options);
  }

  initReservation(): Observable<any> {
    const url = this.url + `company/${this.companyId}/flow/${this.flowId}/initialstepconfiguration`;
    const options = { params: this.params() };
    return this.http.get(url, options);
  }

  private params(reservation?: Reservation): HttpParams {
    let params = new HttpParams()
      .set('aid', '1')
      .set('cid', '745')
      .set('cacid', '1')
      .set('rn_partnerid', '51')
      .set('scid', '285')
      .set('flowID', '101');
    if (reservation) {
      params = params
        .set('NOPersons', '4') // reservation.nbrOfPeople + '')
        .set('Date', '2018-07-28') // reservation.date.toLocaleDateString())
        .set('categoryId', '1507'); // 's Avonds
    }
    return params;
  }

  private handleResponse(response) {}
}
