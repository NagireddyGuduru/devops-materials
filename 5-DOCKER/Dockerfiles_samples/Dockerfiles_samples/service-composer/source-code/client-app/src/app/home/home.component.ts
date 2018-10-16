import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../application-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private _router: Router,
            private _applicationStateService: ApplicationStateService) { }

  ngOnInit() {
  }

  goToCatalog() {
    this._router.navigate([this._applicationStateService.catalogHomeRoute]);
  }
}
