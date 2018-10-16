import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// <block-oauth2-authorization-service-start>
import { LoginComponent } from './login/login.component';

import { SecurityService } from './security.service';
import { ExternalResourceGuard } from './external-resource.guard';
// <block-oauth2-authorization-service-end>
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ApplicationStateService } from './application-state.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    // <block-oauth2-authorization-service-start>
    LoginComponent,
    // <block-oauth2-authorization-service-end>
    HomeComponent
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
    // <block-oauth2-authorization-service-start>
    SecurityService,
    ExternalResourceGuard, 
    // <block-oauth2-authorization-service-end>
    ApplicationStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
