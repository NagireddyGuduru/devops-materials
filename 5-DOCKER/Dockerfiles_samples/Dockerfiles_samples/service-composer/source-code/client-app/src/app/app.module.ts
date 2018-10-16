import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ComposerComponent } from './composer/composer.component';

import { CatalogService } from './catalog.service';
import { ApplicationStateService } from './application-state.service';
import { ShoppingCartService } from './shopping-cart.service';
import { DeployComponent } from './deploy/deploy.component';
import { CardsCatalogComponent } from './cards-catalog/cards-catalog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { HomeNavigationGuard } from './home-navigation.guard';
import { AccordionCatalogComponent } from './accordion-catalog/accordion-catalog.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent ,
      canActivate: [ HomeNavigationGuard ] },
  { path: 'cards/:page', component: CardsCatalogComponent },
  { path: 'service-catalog', component: AccordionCatalogComponent },
  { path: 'view-cart', component: ShoppingCartComponent },
  { path: 'project-info', component: ProjectInfoComponent },
  { path: 'compose', component: ComposerComponent },
  { path: 'deploy', component: DeployComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComposerComponent,
    DeployComponent,
    CardsCatalogComponent,
    ShoppingCartComponent,
    ProjectInfoComponent,
    AccordionCatalogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CatalogService,
    ApplicationStateService,
    ShoppingCartService,
    HomeNavigationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
