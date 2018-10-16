import { Component, OnInit } from '@angular/core';
import { ClientInfo } from '../model/client-info';
import { ServiceGraph } from '../model/service-graph';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { ApplicationStateService } from '../application-state.service';

@Component({
  selector: 'app-cards-catalog',
  templateUrl: './cards-catalog.component.html',
  styleUrls: ['./cards-catalog.component.css']
})
export class CardsCatalogComponent implements OnInit {
  public category: any;
  public currentPage: number = -1;
  public numberOfCategories: number = 0

  private catalog: any;
  private serviceGraph: ServiceGraph;

  constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _catalogService: CatalogService,
                private _applicationStateService: ApplicationStateService) {
    this.category = {};
  }

  ngOnInit() {
    let _this = this;
    if (this._applicationStateService.catalog) {
      this.catalog = this._applicationStateService.catalog;
      this.serviceGraph = this._applicationStateService.serviceGraph;
      if (this.catalog.categories) {
        this.numberOfCategories = this.catalog.categories.length;
        this.setCategory();
      }
    } else {
      this._catalogService.fetchServiceCatalog(
        function (data) {
          _this.catalog = data;
          let serviceMap = _this._catalogService.buildServiceMap(_this.catalog);
          _this.serviceGraph = new ServiceGraph(serviceMap);
          _this._applicationStateService.catalog = _this.catalog;
          _this._applicationStateService.serviceGraph = _this.serviceGraph;
          if (_this.catalog.categories) {
            _this.numberOfCategories = _this.catalog.categories.length;
            _this.setCategory();
          }
        },
        function (error) {
          console.log(error);
        }
      );
    }

    let page = this._route.paramMap
      .subscribe(
        paramMap => {
          _this.currentPage = parseInt(paramMap.get('page'));
          _this.setCategory();
        }
      );
  }

  navigateToNextPage() {
    this.currentPage++;
    this.setCategory();
    this._router.navigate(['/cards/' + this.currentPage]);
  }

  navigateToPreviousPage() {
    this.currentPage--;
    this.setCategory();
    this._router.navigate(['/cards/' + this.currentPage]);
  }

  viewCart() {
    this._router.navigate(['/view-cart']);
  }

  serviceSelectionChanged(checkbox: any) {
    if (true === checkbox.checked) {
      try {
        this.addNodeToGraph(checkbox.id)
      } catch (err) {
        console.log(err);
        alert('Unable to include this service. Reason: ' + err + ".");
        checkbox.checked = false;
      }
    } else {
      try {
        this.removeNodeFromGraph(checkbox.id);
      } catch (err) {
        alert('Unable to remove this service. Reason: ' + err + ".");
        checkbox.checked = true;
      }
    }
  }

  shouldSelectService(serviceId: string) {
    return this.serviceGraph.isServiceSelected(serviceId);
  }

  shouldDisableService(serviceId: string) {
    return !this.serviceGraph.isServiceEnabled(serviceId) ||
      this.serviceGraph.isServiceIncludedImplicitly(serviceId) ||
      this.serviceGraph.isServiceExcludedImplicitly(serviceId) ||
      !this.serviceGraph.isServiceDependenciesSelected(serviceId);
  } 

  getAllSelectedServices() {
    return this.serviceGraph.getAllSelectedServices();
  }

  private addNodeToGraph(serviceId: string) {
    return this.serviceGraph.addService(serviceId);
  }

  private removeNodeFromGraph(serviceId: string) {
    this.serviceGraph.removeService(serviceId);
  }

  private setCategory() {
    if (!this.catalog) {
      this.currentPage = 0;
      this._router.navigate(['/cards/' + this.currentPage]);
      return;
    }
    if (this.catalog.categories &&
      this.currentPage > -1 &&
      this.catalog.categories.length > this.currentPage) {
      this.category = this.catalog.categories[this.currentPage];
    } else {
      this.category = null;
    }
  }

}
