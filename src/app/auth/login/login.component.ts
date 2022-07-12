import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
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
    this.loginForm = new FormGroup({
      email : new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, [Validators.required] )
    })
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm?.value.email,
      password: this.loginForm?.value.password
    });
  };

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

}
