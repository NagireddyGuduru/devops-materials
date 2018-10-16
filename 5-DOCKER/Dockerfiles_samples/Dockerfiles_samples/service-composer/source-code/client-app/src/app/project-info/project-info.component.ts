import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../application-state.service';
import { ClientInfo } from '../model/client-info';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  public clientInfo: ClientInfo;

  constructor(private _router: Router,
            private _applicationStateService: ApplicationStateService) { }

  ngOnInit() {
    if (!this._applicationStateService.clientInfo) {
      this._applicationStateService.clientInfo = new ClientInfo();
    }
    this.clientInfo = this._applicationStateService.clientInfo;
    if (!this._applicationStateService.serviceGraph || 
          this._applicationStateService.serviceGraph.getAllSelectedServices().length == 0) {
      this._router.navigate([this._applicationStateService.catalogHomeRoute]);
    }
  }

  compose() {
    this._router.navigate(['/compose']);
  }
}
