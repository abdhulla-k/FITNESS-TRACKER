import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
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

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

}
