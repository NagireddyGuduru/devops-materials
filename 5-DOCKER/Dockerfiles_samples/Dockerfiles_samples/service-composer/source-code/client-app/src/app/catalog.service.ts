import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { ApplicationStateService } from './application-state.service';

@Injectable()
export class CatalogService {

  constructor(private _http: Http,
              private _applicationStateService: ApplicationStateService) { }

  fetchServiceCatalog(successCallback, failureCallback) {
    this._http.get(
      this._applicationStateService.toUrl(environment.catalogServiceUrl))
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

  buildServiceMap(catalog: any) {
    if (catalog && catalog.categories) {
      let serviceMap = {};
      this.addToServiceMap(serviceMap, catalog.categories);
      return serviceMap;
    } else {
      return {};
    }
  }

  private addToServiceMap(map: any, categories: any) {
    categories.forEach(category => {
      if (category.services) {
        category.services.forEach(service => {
          map[service.id] = service;
        });
      }
      if (category.categories) {
        this.addToServiceMap(map, category.categories);
      }
    });
  }
}
