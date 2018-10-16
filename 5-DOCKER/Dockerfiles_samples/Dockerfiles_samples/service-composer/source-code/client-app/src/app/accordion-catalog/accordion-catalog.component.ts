import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { ApplicationStateService } from '../application-state.service';
import { ServiceGraph } from '../model/service-graph';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accordion-catalog',
  templateUrl: './accordion-catalog.component.html',
  styleUrls: ['./accordion-catalog.component.css']
})
export class AccordionCatalogComponent implements OnInit {
  public currentPage: number = 0;
  public numberOfCategories: number = 0
  public catalog: any = {};
  public accordionState: boolean[];

  private serviceGraph: ServiceGraph;

  constructor(private _router: Router,
              private _catalogService: CatalogService,
              private _applicationStateService: ApplicationStateService) { }

  ngOnInit() {
    let _this = this;
    if (this._applicationStateService.catalog) {
      this.catalog = this._applicationStateService.catalog;
      this.serviceGraph = this._applicationStateService.serviceGraph;
      if (this.catalog.categories) {
        this.numberOfCategories = this.catalog.categories.length;
        this.prepareAccordion();
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
            _this.prepareAccordion();
          }
        },
        function (error) {
          console.log(error);
        }
      );
    }
  }

  navigateToPreviousPage() {
    let index = this.currentPage - 1;
    if (index < 0) {
      this.togglePanel(0);
    } else {
      this.togglePanel(index);
    }
  }

  navigateToNextPage() {
    let index = this.currentPage + 1;
    if (index >= this.numberOfCategories) {
      this.togglePanel(this.numberOfCategories - 1);
    } else {
      this.togglePanel(index);
    }
  }

  viewCart() {
    this._router.navigate(['/view-cart']);
  }

  expandAll() {
    for (let index=0; index<this.accordionState.length; index++) {
      this.accordionState[index] = true;
    }
  }

  togglePanel(index) {
    for (let index = 0; index < this.accordionState.length; index++) {
      this.accordionState[index] = false;
    }
    this.accordionState[index] = true;
    this.currentPage = index;
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

  private prepareAccordion() {
    this.accordionState = [];
    for(let index=0; index<this.numberOfCategories; index++) {
      this.accordionState.push(false);
    }
    if (this.accordionState.length > 0) {
      this.accordionState[0] = true;
    }
  }

}
