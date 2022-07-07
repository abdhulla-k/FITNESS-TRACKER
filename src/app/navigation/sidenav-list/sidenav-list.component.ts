import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: boolean | undefined;
  authSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe( authData => {
      this.isAuth = authData;
    })
  }

  onClos() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClos()
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
