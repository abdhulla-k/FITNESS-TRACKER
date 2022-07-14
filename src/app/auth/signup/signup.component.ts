import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate = new Date();
  isLoading$: Observable<boolean> | undefined;
  private loadingSub: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select( fromRoot.getIsLoading )
    // this.loadingSub = this.uiService.loginStateChanged.subscribe( isLoading => {
    //   this.isLoading = isLoading;
    // })
    // set minimam of 18 year for date picker
    this.maxDate = new Date()
    this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );
  }

  onSubmit( form: NgForm ) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  // ngOnDestroy(): void {
  //   this.loadingSub?.unsubscribe();
  // }

}
