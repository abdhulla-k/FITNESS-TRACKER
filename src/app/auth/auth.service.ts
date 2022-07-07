import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | undefined;
  public authChange = new Subject<boolean>()

  constructor(
    private router: Router
  ) {}

  registerUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString()
    };
    this.authSuccessfully();
  };

  login( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString()
    }
    this.authSuccessfully();
  }

  logout() {
    this.user = null as any;
    this.authChange.next( false );
    this.router.navigate(['/login'])
  }

  getUser() {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next( true );
    this.router.navigate(['/training'])
  }
}
