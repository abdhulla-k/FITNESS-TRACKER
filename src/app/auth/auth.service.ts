import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | undefined;
  public authChange = new Subject<boolean>()

  constructor() {}

  registerUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString()
    };
    this.authChange.next( true );
  };

  login( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString()
    }
    this.authChange.next( true );
  }

  logout() {
    this.user = null as any;
    this.authChange.next( false );
  }

  getUser() {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null;
  }

}
