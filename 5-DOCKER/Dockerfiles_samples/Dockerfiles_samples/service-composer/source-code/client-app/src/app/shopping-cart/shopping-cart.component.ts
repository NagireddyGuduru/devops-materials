import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../application-state.service';
import { ServiceGraph } from '../model/service-graph';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private serviceGraph: ServiceGraph;

  constructor(private _router: Router,
        private _applicationStateService: ApplicationStateService) { 
    this.serviceGraph = this._applicationStateService.serviceGraph;
  }

  ngOnInit() {
    if (!this.serviceGraph || this.serviceGraph.getAllSelectedServices().length == 0) {
      this._router.navigate([this._applicationStateService.catalogHomeRoute]);
      
    }
  }

  getAllSelectedServices() {
    if (this.serviceGraph) {
      return this.serviceGraph.getAllSelectedServices();
    } else {
      return [];
    }
  }

  navigateToPreviousPage() {
    this._router.navigate([this._applicationStateService.catalogHomeRoute]);
  }

  shouldSelectService(serviceId: string) {
    return this.serviceGraph.isServiceSelected(serviceId);
  }

  checkout() {
    this._router.navigate(['/project-info']);
  }

  shouldDisableService(serviceId: string) {
    return !this.serviceGraph.isServiceEnabled(serviceId) ||
      this.serviceGraph.isServiceIncludedImplicitly(serviceId) ||
      this.serviceGraph.isServiceExcludedImplicitly(serviceId) ||
      !this.serviceGraph.isServiceDependenciesSelected(serviceId);
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
      if (!confirm("Are you sure to remove the component from the cart?")) {
        checkbox.checked = true;
        return;
      }
      try {
        this.removeNodeFromGraph(checkbox.id);
      } catch (err) {
        alert('Unable to remove this service. Reason: ' + err + ".");
        checkbox.checked = true;
      }
    }
  }

  private addNodeToGraph(serviceId: string) {
    return this.serviceGraph.addService(serviceId);
  }

  private removeNodeFromGraph(serviceId: string) {
    this.serviceGraph.removeService(serviceId);
  }

}
