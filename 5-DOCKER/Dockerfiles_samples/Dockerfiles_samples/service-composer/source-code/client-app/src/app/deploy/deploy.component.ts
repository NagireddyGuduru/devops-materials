import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../application-state.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements OnInit {

  public deploymentParameters: Object;
  public parameterNames: string[];
  public deploymentInProgress: boolean;
  public deploymentDone: boolean;
  public deploymentLogs: string;
  private deploymentInput: Object;
  private logsReaduntil: number;

  constructor(
      private _router: Router,
      private _shoppingCartService: ShoppingCartService,
      private _applicationStateService: ApplicationStateService) { }

  ngOnInit() {
    if (!this._applicationStateService.deploymentDetailsUrl) {
      this._router.navigate([this._applicationStateService.catalogHomeRoute]);
      return;
    }
    this.deploymentInProgress = false;
    this.deploymentDone = false;
    let _this = this;
    this._shoppingCartService.jsonGet(
      this._applicationStateService.deploymentDetailsUrl,
      //  "/cart/deploymentInfo/3",
      function(response) {
        _this.deploymentParameters = response;
        let paramNames = [];
        for (let paramName in response) {
          paramNames.push(paramName);
        }
        _this.parameterNames = paramNames;
      },
      function(error) {
        console.log(error);
      });
  }

  cancel() {
    this._router.navigate(['/']);
  }

  startDeployment() {
    this.resetLogs();
    this.deploymentInput = {};
    for (let paramName in this.deploymentParameters) {
      this.deploymentInput[paramName] = (<HTMLInputElement>document.getElementById('txt' + paramName)).value;
    }

    this.placeDeploymentRequest(this._applicationStateService.deploymentUrl);
  }

  startDeploymentAgain() {
    this.resetLogs();
    this.placeDeploymentRequest(this._applicationStateService.redeploymentUrl);
  }

  resetLogs() {
    this.logsReaduntil = 0;
    this.deploymentLogs = "";
  }

  placeDeploymentRequest(deployUrl) {
    this.deploymentInProgress = true;
    this.deploymentDone = false;
    let _this = this;
    this._shoppingCartService.jsonPost(
      deployUrl,
      // "/cart/deploy/3",
      this.deploymentInput,
      function (data) {
        _this.deploymentInProgress = true;
        Observable.interval(3000)
          .takeWhile(() => _this.deploymentInProgress)
          .subscribe(i => {
            _this._shoppingCartService.jsonGet(
              _this._applicationStateService.deploymentStatusUrl,
              //  "/cart/deploymentStatus/3",
              function (response) {
                _this.loadLogs();
                if (true == response) {
                  _this.deploymentInProgress = false;
                  _this.deploymentDone = true;
                }
              }, function (error) {
                _this.deploymentInProgress = true;
                _this.deploymentDone = true;
                console.log(error);
                _this.loadLogs();
              });
          })
      },
      function (error) {
        console.log(error);
        alert(error);
      });
  }

  loadLogs() {
    if (!this.logsReaduntil) {
      this.logsReaduntil = 0;
    }
    let _this = this;
    this._shoppingCartService.jsonGet(
      this._applicationStateService.deploymentLogsUrl + '/' + _this.logsReaduntil,
      // "/cart/deploymentLogs/3",
      function(data) {
        _this.deploymentLogs = _this.deploymentLogs.concat(data.logs);
        _this.logsReaduntil = data.readUntil;
        setTimeout(function () {
          if (document.getElementById('txtLogs')) {
            document.getElementById('txtLogs').scrollTop = document.getElementById('txtLogs').scrollHeight;
          }
        }, 100);
      },
      function(err) {
        console.log(err); 
      }
    );
  }

}
