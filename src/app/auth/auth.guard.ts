import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import * as fromRoot from "../app.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private stoer: Store<fromRoot.State>,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.stoer.select( fromRoot.getIsAuth ).pipe(
      take(1)
    );
  }

  canLoad(
    route: Route ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.stoer.select( fromRoot.getIsAuth ).pipe(
        take(1)
      );
  }
}
