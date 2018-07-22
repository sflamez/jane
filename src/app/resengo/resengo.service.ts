import { User } from './../user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResengoService {

  private url = 'https://cloudapi.resengo.com';

  private theJane = 553;

  user: Observable<User>;

  constructor(private http: HttpClient) { }

  authenticate(): Observable<User> {
    const body = {
      'login': 'sem.flamez@gmail.com',
      'password': '46jKEuA*vs!Z',
      'type': 1
     };
    this.user = this.http.post<User>(this.url + '/Authentication', body);
    return this.user;
  }

  getAvailability(date): Observable<any> {
    return this.http.get(this.url + '');
  }

}
