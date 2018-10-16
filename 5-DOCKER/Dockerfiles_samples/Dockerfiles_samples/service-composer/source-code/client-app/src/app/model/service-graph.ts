export class ServiceNode {
    public serviceId: string;
    public implicit: boolean;
    public implicitIncludes: ServiceNode[];
    public implicitExcludes: ServiceNode[];
    public dependentServices: string[];

    constructor(public service: any) {
        this.serviceId = service.id;
        this.implicit = false;
    }
}

export class ServiceGraph {
    public nodes: ServiceNode[];

    constructor(private serviceMap: any) {
        this.nodes = [];
    }

    public addService(serviceId: string) {  
        if (this.canAddService(serviceId)) {
            let service: any = this.serviceMap[serviceId];
            if (service) {
                let newNode: ServiceNode = new ServiceNode(service);
                this.nodes.push(newNode);
                this.populateChildGraph(newNode, service, [service.id]);
                return true;
            } else {
                console.log("Service with id '", serviceId, "' not found.")
            }
        }
        return false;
    }

    private canAddService(serviceId: string) {
        this.nodes.forEach(node => {
            //Service already selected
            if (node.serviceId == serviceId) {
                throw "Service '" + node.service.name + "' already added to the cart";
            }

            //Service already included as part of an implicit requirement 
            if (this.serviceIncluded(node, serviceId)) {
                throw "Service already included implicitly by '" + node.service.name + "'";
            }

            if (this.serviceExcluded(node, serviceId)) {
                throw "Service excluded by '" + node.service.name + "'";
            }
            
            if (this.referencedServicesConflicts(node, serviceId)) {
                throw "Service excluded by an implicit requirement of '" + node.service.name + "'";
            }
        });

        if (!this.isServiceDependenciesSelected(serviceId)) {
            throw "Dependent services are not included";
        }
         
        return true;
    }

    private referencedServicesConflicts(node: ServiceNode, serviceId: string) {
        let result = false;
        let service = this.serviceMap[serviceId];
        if (service) {
            if (this.checkIfImplicitIncludesExcluded(node, service)) {
                result = true;
            } else {
                if (this.checkIfImplicitExcludesIncluded(node, service)) {
                    result = true;
                }
            }
        }
        return result;
    }

    private checkIfImplicitIncludesExcluded(node: ServiceNode, service: any) {
        let result = false;
        if (service.implicitIncludes) {
            service.implicitIncludes.forEach(element => {
                if (this.serviceExcluded(node, element)) {
                    result = true;
                    return;
                }
                if (this.referencedServicesConflicts(node, element)) {
                    result = true;
                    return;
                }
            });
        }
        return result;
    }

    private checkIfImplicitExcludesIncluded(node: ServiceNode, service: any) {
        let result = false;
        if (service.implicitExcludes) {
            service.implicitExcludes.forEach(element => {
                if (this.serviceIncluded(node, element)) {
                    result = true;
                    return;
                }
            });
        }
        return result;
    }

    private serviceIncluded(node: ServiceNode, serviceId: string) {
        let result = false;
        if (node.implicitIncludes) {
            node.implicitIncludes.forEach(element => {
                if (element.serviceId == serviceId) {
                    result = true;
                    return;
                }
                if (this.serviceIncluded(element, serviceId)) {
                    result = true;
                    return;
                }
            });
        }
        return result;
    }

    private serviceExcluded(node: ServiceNode, serviceId: string) {
        let result = false;
        if (node.implicitExcludes) {
            node.implicitExcludes.forEach(element => {
                if (element.serviceId == serviceId) {
                    result = true;
                    return;
                }
                if (this.serviceExcluded(element, serviceId)) {
                    result = true;
                    return;
                }
            });
        }
        if (node.implicitIncludes && !result) {
            node.implicitIncludes.forEach(element => {
                if (this.serviceExcluded(element, serviceId)) {
                    result = true;
                    return;
                }
            });
        }
        return result;
    }

    private populateChildGraph(node: ServiceNode, service: any, serviceStack: string[]) {
        node.implicitIncludes = [];
        this.addImplicitIncludes(node, service, serviceStack);
        node.implicitExcludes = [];
        this.addImplicitExcludes(node, service, serviceStack);
        node.dependentServices = [];
        this.addDependentServices(node, service);
    }

    private addDependentServices(node: ServiceNode, service: any) {
        if (service.dependentServices) {
            service.dependentServices.forEach(element => {
                node.dependentServices.push(element);
            });
        }
    }

    private addImplicitIncludes(node: ServiceNode, service: any, serviceStack: string[]) {
        if (service.implicitIncludes) {
            service.implicitIncludes.forEach(element => {
                let implicitIncludeService = this.serviceMap[element];
                if (implicitIncludeService) {
                    if (serviceStack.indexOf(element) < 0) {
                        let newNode: ServiceNode = new ServiceNode(implicitIncludeService);
                        newNode.implicit = true;
                        node.implicitIncludes.push(newNode);
                        serviceStack.push(element);
                        this.populateChildGraph(newNode, implicitIncludeService, serviceStack);
                    } else {
                        console.log("Inclusion of Service '", element, "' makes a cyclic reference in implicit includes.");
                    }
                } else {
                    console.log("Service '", element, "' not found.");
                }
            });
        }
    }

    private addImplicitExcludes(node: ServiceNode, service: any, serviceStack: string[]) {
        if (service.implicitExcludes) {
            service.implicitExcludes.forEach(element => {
                let implicitExcludeService = this.serviceMap[element];
                if (implicitExcludeService) {
                    if (serviceStack.indexOf(element) < 0) {
                        let newNode: ServiceNode = new ServiceNode(implicitExcludeService);
                        newNode.implicit = true;
                        node.implicitExcludes.push(newNode);
                        serviceStack.push(element);
                        this.populateChildGraph(newNode, implicitExcludeService, serviceStack);
                        //} else {
                        //    console.log("Exlusion of Service '", element, "' makes a cyclic reference in implicit excludes.");    
                    }
                } else {
                    console.log("Service '", element, "' not found.");
                }
            });
        }
    }

    public removeService(serviceId: string) {
        this.checkCanRemoveService(serviceId);
        let itemToRemove:number = -1;
        for (let index=0; index<this.nodes.length; index++) {
            if (this.nodes[index].serviceId == serviceId) {
                itemToRemove = index;
                break;
            }
        }
        if (itemToRemove > -1) {
            this.nodes.splice(itemToRemove, 1);
        }
    }

    private checkCanRemoveService(serviceId: string) {
        let selectedService: ServiceNode;
        this.nodes.forEach(node => {
            //check if the other node is not dependent on the node being removed
            if (node.serviceId != serviceId) {
                if (node.dependentServices) {
                    node.dependentServices.forEach(requiredService => {
                        if (requiredService == serviceId) {
                            throw "Service is required by '" + node.service.name + "'";
                        }
                    });
                }
            }
        });
    }

    public isServiceSelected(serviceId: string) {
        let result = false;
        this.nodes.forEach(node => {
            if (node.serviceId == serviceId) {
                result = true;
                return;
            }

            if (this.serviceIncluded(node, serviceId)) {
                result = true;
                return;
            }
        });
        return result;
    }

    public getAllSelectedServices() {
        let result: ServiceNode[] = [];
        let serviceStack: string[] = [];
        this.nodes.forEach(node => {
            this.includeImplicitServices(result, node, serviceStack);
        });
        return result;
    }

    private includeImplicitServices(collector: ServiceNode[], node: ServiceNode, serviceStack: string[]) {
        if (serviceStack.indexOf(node.serviceId) < 0) {
            collector.push(node);
            serviceStack.push(node.serviceId);
        }
        node.implicitIncludes.forEach(element => {
            this.includeImplicitServices(collector, element, serviceStack);
        });
    }

    public isServiceEnabled(serviceId: string) {
        return this.serviceMap[serviceId].enabled;
    }

    public isServiceIncludedImplicitly(serviceId: string) {
        let result = false;
        this.nodes.forEach(node => {
            if (this.serviceIncluded(node, serviceId)) {
                result = true;
                return;
            }
        });
        return result;
    }

    public isServiceExcludedImplicitly(serviceId: string) {
        let result = false;
        this.nodes.forEach(node => {
            if (this.serviceExcluded(node, serviceId)) {
                result = true;
                return;
            }
        });
        return result;
    }

    public isServiceDependenciesSelected(serviceId: string) {
        let result = true;
        let selectedServices: ServiceNode[] = this.getAllSelectedServices();
        let selectedServiceIds: string[] = [];
        if (!selectedServices) {
            selectedServices = [];
        }
        selectedServices.forEach(node => {
            if (selectedServiceIds.indexOf(node.serviceId) < 0) {
                selectedServiceIds.push(node.serviceId);
            }
        });

        let service: any = this.serviceMap[serviceId];
        if (service) {
            if (service.dependentServices) {
                service.dependentServices.forEach(element => {
                    if (selectedServiceIds.indexOf(element) < 0) {
                        result = false;
                        return;
                    }        
                });
            }
        } else {
            console.log("Service with id '", serviceId, "' not found.")
        }
        
        return result;
    }
}