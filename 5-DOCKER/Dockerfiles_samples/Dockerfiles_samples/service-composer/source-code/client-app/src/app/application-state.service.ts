import { Injectable } from '@angular/core';

import { ServiceNode, ServiceGraph } from './model/service-graph';
import { ClientInfo } from './model/client-info';

import { environment } from '../environments/environment';

@Injectable()
export class ApplicationStateService {

  public clientInfo: ClientInfo;
  public deploymentDetailsUrl: string;
  public deploymentUrl: string;
  public redeploymentUrl: string;
  public deploymentStatusUrl: string;
  public deploymentLogsUrl: string;
  public serviceGraph: ServiceGraph;
  public catalog: any;
  public catalogHomeRoute: string = '/service-catalog'; //'/cards/0';
  
  constructor() { }

  public toUrl(url: string) {
    if (environment.production) {
      return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + url;
    } else {
      return url;
    }
  }

  public resetState() {
    this.clientInfo = null;
    this.deploymentDetailsUrl = null;
    this.deploymentUrl = null;
    this.redeploymentUrl = null;
    this.deploymentStatusUrl = null;
    this.deploymentLogsUrl = null;
    this.serviceGraph = null;
    this.catalog = null;
  }
}
