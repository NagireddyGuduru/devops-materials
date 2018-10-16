import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";

import { AppComponent } from './app.component.ts';
import { StatisticsComponent } from './statistics/statistics.component.ts';

const appRoutes: Routes = [
    { path: '', component: AppComponent}
];

//enableProdMode();

@NgModule({
    declarations: [
        AppComponent,
        StatisticsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {
            useHash: true
        }),
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/dashboard/' }
    ],
    
    bootstrap: [AppComponent]
})
export default class MainModule {
}
