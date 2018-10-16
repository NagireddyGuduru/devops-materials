import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
// <block-oauth2-authorization-service-start>
import { SecurityService } from '../security.service';
// <block-oauth2-authorization-service-end>
import { ApplicationStateService } from '../application-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginPaletteVisible: boolean = false;

  constructor(
                // <block-oauth2-authorization-service-start>
                private _securityService: SecurityService,
                // <block-oauth2-authorization-service-end>
                private _applicationStateService: ApplicationStateService) { }

  ngOnInit() {
  }
  
  navigateToMicroFrontEndsApp() {
    // <block-micro-frontends-start>
    // <block-oauth2-authorization-service-start>
    let _this = this;
    let routingFunction = function () {
      // <block-oauth2-authorization-service-end>
      document.location.href = environment.microFrontendAppsUri;
      // <block-oauth2-authorization-service-start>
    };
    let loginFunction = function() {
      _this._applicationStateService.postLoginRouter = routingFunction;
      _this.showLoginPalette(); 
    }
    if (this._securityService.isLoggedIn()) {
      this._securityService.checkTokenValidity(routingFunction , loginFunction);
    } else {
      loginFunction();
    }
    // <block-oauth2-authorization-service-end>
    // <block-micro-frontends-end>
  }

  // <block-oauth2-authorization-service-start>
  showLoginPalette() {
    this.loginPaletteVisible = true;
  }

  hideLoginPalette() {
    this.loginPaletteVisible = false;
  }
  // <block-oauth2-authorization-service-end>
}
