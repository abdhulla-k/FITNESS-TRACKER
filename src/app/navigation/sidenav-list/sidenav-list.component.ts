import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean> | undefined;
  authSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange.subscribe( authData => {
    //   this.isAuth = authData;
    // })
    this.store.select( fromRoot.getIsAuth )
  }

  onClos() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClos()
    this.authService.logout()
  }
}
