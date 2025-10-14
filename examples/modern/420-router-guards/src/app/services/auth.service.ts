import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  isLoggedIn(): boolean {
    // Here: implement your authentication logic!
    // Currently, we are returning true, to demonstrate the authGuard that uses this function.
    return true
  }
}
