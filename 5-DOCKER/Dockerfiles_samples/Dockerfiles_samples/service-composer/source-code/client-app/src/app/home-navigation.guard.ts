import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApplicationStateService } from './application-state.service';

@Injectable()
export class HomeNavigationGuard implements CanActivate {

  constructor(private _applicationStateService: ApplicationStateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ('/' == state.url) {
      this._applicationStateService.resetState();
    }
    return true;
  }
}
