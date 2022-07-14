import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators'

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$: Observable<boolean> | undefined;
  private loadingSub: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select( fromRoot.getIsLoading );
    // this.loadingSub = this.uiService.loginStateChanged.subscribe( isLoading => {
    //   this.isLoading = isLoading;
    // })
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

  // ngOnDestroy(): void {
  //   this.loadingSub?.unsubscribe();
  // }

}
