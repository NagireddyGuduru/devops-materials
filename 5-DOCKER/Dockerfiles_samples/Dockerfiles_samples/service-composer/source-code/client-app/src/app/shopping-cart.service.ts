import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { ClientInfo } from './model/client-info';
import { ApplicationStateService } from './application-state.service';

@Injectable()
export class ShoppingCartService {

  constructor(private _http: Http,
        private _applicationStateService: ApplicationStateService) { }

  public jsonGet(url: string, successCallback, failureCallback) {
    this._http.get(
      this._applicationStateService.toUrl(environment.serviceRootUrl + url))
        .map(res => res.json())
        .subscribe(
          data => {
            successCallback(data);
          },
          err => {
            failureCallback(err);
          }
        );
  }

  public textGet(url: string, successCallback, failureCallback) {
    this._http.get(
      this._applicationStateService.toUrl(environment.serviceRootUrl + url))
        .map(res => res['_body'])
        .subscribe(
          data => {
            successCallback(data);
          },
          err => {
            failureCallback(err);
          }
        );
  }

  public jsonPost(url: string, data, successCallback, failureCallback) {
    this._http.post(
      this._applicationStateService.toUrl(environment.serviceRootUrl + url), data)
        .map(res => res.json())
        .subscribe(
          res => {
            successCallback(res);
          },
          err => {
            failureCallback(err);
          }
        );
  } 

  public checkout(clientInfo: ClientInfo, selectedServices: string[], successCallback, failureCallback) {
    let request = {};
    request['organizationName'] = clientInfo.organizationName;
    request['organizationUrl'] = clientInfo.organizationUrl;
    request['projectName'] = clientInfo.projectName;
    request['projectUrl'] = clientInfo.projectUrl;
    request['projectDescription'] = clientInfo.projectDescription;
    request['selectedServices'] = selectedServices;

    this._http.post(
      this._applicationStateService.toUrl(environment.shoppingCartServiceUrl + '/checkout'), request)
        .map(res => res.json())
        .subscribe(
          data => {
            successCallback(data);
          },
          err => {
            failureCallback(err);
          }
        );
  }
}
