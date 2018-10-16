import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from './environments/environment.ts';
import * as loginGuard from '../root-application/login-guard.js';

@Injectable()
export class UserService {

    constructor(@Inject(Http) private _http: Http) { }

    getAllUsers(successCallback, failureCallback) {
        let accessToken = loginGuard.getAccessToken();
        let headers = new Headers( {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
                                        'Authorization': 'bearer ' + accessToken });
        let options = new RequestOptions({ headers: headers });
        this._http.get(environment.userServiceUri, options)
            .map(res => res.json())
            .subscribe(
            data => {
                successCallback(data);
            },
            err => failureCallback(err)
            );
    }
}
