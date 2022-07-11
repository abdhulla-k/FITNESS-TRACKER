import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private user: User | undefined;
  public authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  registerUser( authData: AuthData ) {
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then( result => {
      this.authSuccessfully()
    })
    .catch( error => {
      console.log( error );
    });
  };

  login( authData: AuthData ) {
    this.afAuth.signInWithEmailAndPassword(
      authData.email, authData.password
    ).then( result => {
      console.log(result)
      this.authSuccessfully()
    })
    .catch( error => {
      console.log( error );
    });
  }

  logout() {
    // this.user = null as any;
    this.trainingService.cancelSubscriptions();
    this.authChange.next( false );
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next( true );
    this.router.navigate(['/training'])
  }
}
