import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class SecurityService {

  constructor(private _http: Http) { }

  obtainAccessToken(loginData, successCallback, failureCallback) {
    let params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', environment.oauth2ClientAppName);

    let headers = new Headers(
        {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
          'Authorization': 'Basic ' + 
              btoa(environment.oauth2ClientAppName + ":" + environment.oauth2ClientAppSecret) 
        });
    let options = new RequestOptions({ headers: headers });
    this._http.post(environment.oauth2TokenUri, params.toString(), options)
      .map(res => res.json())
      .subscribe(
      data => {
        this.saveToken(data);
        successCallback();
      },
      err => failureCallback(err)
      );
  }

  checkTokenValidity(successCallback, failureCallback) {
    let headers = new Headers(
      {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'bearer ' + this.getToken()
      });
    let options = new RequestOptions({ headers: headers });
    this._http.get(environment.oauth2UserInfoUri, options)
      .map(res => res.json())
      .subscribe(
        data => {
          successCallback(data);
        },
        err => {
          failureCallback(err);
        }
      );
      return false;
  }

  saveToken(token) {
    Cookie.delete('access_token');
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
  }

  getToken() {
    return Cookie.getAll()['access_token'];
  }

  isLoggedIn() {
    return Cookie.check('access_token');
  }

  logout() {
    Cookie.delete('access_token');
  }
}
