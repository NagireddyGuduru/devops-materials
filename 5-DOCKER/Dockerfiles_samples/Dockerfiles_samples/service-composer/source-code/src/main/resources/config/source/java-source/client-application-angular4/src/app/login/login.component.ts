import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

import { ApplicationStateService } from '../application-state.service';
import { SecurityService } from '../security.service';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  public loginData = { username: "", password: "" };
  public loginButtonEnabled: boolean = true;

  @Output() hideLogin = new EventEmitter<boolean>();

  constructor(private _router: Router, 
                private _securityService: SecurityService,
                private _applicationStateService: ApplicationStateService) { }

  ngOnInit() {
  }

  closeLogin() {
    this.hideLogin.emit(true);
  }

  login() {
    this.loginButtonEnabled = false;
    let _this = this;
    this._securityService.obtainAccessToken(
        this.loginData, 
        function() {
          _this.closeLogin();
          if (_this._applicationStateService.postLoginRouter) {
            _this._applicationStateService.postLoginRouter();
          }
        }, 
        function(err) {
          _this.loginButtonEnabled = true;
          console.log(err);
          alert('Invalid Credentials!!!'); 
        });
  }
}
