import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate = new Date();
  isLoading = false;
  private loadingSub: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loginStateChanged.subscribe( isLoading => {
      this.isLoading = isLoading;
    })
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

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

}
