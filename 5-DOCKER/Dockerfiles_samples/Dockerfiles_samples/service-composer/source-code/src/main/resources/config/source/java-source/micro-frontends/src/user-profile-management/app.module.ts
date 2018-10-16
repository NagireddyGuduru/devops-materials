import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from '@angular/http';

import { APP_BASE_HREF } from "@angular/common";

import { AppComponent } from './app.component.ts';

import { UserService } from './user.service.ts';

const appRoutes: Routes = [
    { path: '', component: AppComponent }
];

//enableProdMode();

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, {
            useHash: true
        }),
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/userProfileMgmt/' },
        UserService
    ],
    bootstrap: [AppComponent]
})
export default class MainModule {
}
