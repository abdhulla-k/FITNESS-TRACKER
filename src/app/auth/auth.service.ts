import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";

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
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe( user => {
      if( user ) {
        this.isAuthenticated = true;
        this.authChange.next( true );
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next( false );
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser( authData: AuthData ) {
    this.uiService.loginStateChanged.next( true );
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then( result => {
      this.uiService.loginStateChanged.next( false );
    })
    .catch( error => {
      this.uiService.loginStateChanged.next( false );
      // this.snackbar.open( error.message, null as any, {
      //   duration: 3000
      // });
      this.uiService.showSnackbar( error.message, null, 3000 );
    });
  };

  login( authData: AuthData ) {
    this.uiService.loginStateChanged.next( true );
    this.afAuth.signInWithEmailAndPassword(
      authData.email, authData.password
    ).then( result => {
      this.uiService.loginStateChanged.next( false );
    })
    .catch( error => {
      this.uiService.loginStateChanged.next( false );
      // this.snackbar.open( error.message, null as any, {
      //   duration: 3000
      // });
      this.uiService.showSnackbar( error.message, null, 3000 );
    });
  }

  logout() {
    // this.user = null as any;
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
