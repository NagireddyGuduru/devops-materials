import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ApplicationStateService } from '../application-state.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {

  public buildInProgress: boolean;
  public downloadUrl: string;
  private statusUrl: string;
  private buildFailed: boolean;
  public deployable: boolean;

  constructor(private _router: Router,
              private _applicationStateService: ApplicationStateService,
              private _shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.buildInProgress = true;
    this.buildFailed = false;
    let selectedServices;
    if (this._applicationStateService.serviceGraph) {
      selectedServices = this._applicationStateService.serviceGraph.getAllSelectedServices();
    }
    if (selectedServices) {
      let serviceIds = [];
      selectedServices.forEach(element => {
        serviceIds.push(element.serviceId);
      });
      let _this = this;
      this._shoppingCartService.checkout(
            this._applicationStateService.clientInfo,
            serviceIds,
            function(response) {
              _this.statusUrl = response.composeStatusUrl;
              _this.downloadUrl = environment.serviceRootUrl + response.downloadUrl;
              _this.deployable = response.deployable;
              if (_this.deployable) {
                _this._applicationStateService.deploymentDetailsUrl = response.deploymentDetailsUrl;
                _this._applicationStateService.deploymentUrl = response.deployUrl;
                _this._applicationStateService.redeploymentUrl = response.redeployUrl;
                _this._applicationStateService.deploymentLogsUrl = response.deploymentLogsUrl;
                _this._applicationStateService.deploymentStatusUrl = response.deploymentStatusUrl;
              }
              Observable.interval(3000)
                .takeWhile(() => _this.buildInProgress)
                .subscribe(i => {
                  _this._shoppingCartService.jsonGet(
                    _this.statusUrl,
                    function(response) {
                      if (true == response) {
                        _this.buildInProgress = false;
                      }
                    }, function(error) {
                      _this.buildFailed = true;
                      console.log(error);
                    });
                })
            },
            function(error) {
              console.log(error);
            });
    } else {
      this._router.navigate([this._applicationStateService.catalogHomeRoute]);
    }
  }

  close() {
    this._router.navigate(['/']);
  }

  prepareDeploy() {
    this._router.navigate(['/deploy']);
  }
}
