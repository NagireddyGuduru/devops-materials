import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SecurityService } from './security.service';

@Injectable()
export class ExternalResourceGuard implements CanActivate {

  constructor(private _securityService: SecurityService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let loggedIn = this.securityContextExists();
      return loggedIn;
  }

  securityContextExists() {
    return this._securityService.isLoggedIn();
  }
}
