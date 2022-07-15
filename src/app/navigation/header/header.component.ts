import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
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
    this.isAuth$ = this.store.select( fromRoot.getIsAuth );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }

  // ngOnDestroy(): void {
  //   this.authSubscription?.unsubscribe();
  // }

}
