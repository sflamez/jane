import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
