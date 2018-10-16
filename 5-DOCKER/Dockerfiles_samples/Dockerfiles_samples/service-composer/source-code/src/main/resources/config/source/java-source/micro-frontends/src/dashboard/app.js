import 'zone.js';
import 'reflect-metadata';
import singleSpaAngular from 'single-spa-angular2';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';

import mainModule from './app.module.ts';

const ngLifecycles = singleSpaAngular({
    domElementGetter,
    mainModule,
    angularPlatform: platformBrowserDynamic(),
    template: `<mui-dashboard />`,
    Router,
})

export function bootstrap(props) {
    return ngLifecycles.bootstrap(props);
}

export function mount(props) {
    return ngLifecycles.mount(props);
}

export function unmount(props) {
    return ngLifecycles.unmount(props);
}

function domElementGetter() {
    // Make sure there is a div for us to render into
    let el = document.getElementById('mui-dashboard');
    if (!el) {
        el = document.createElement('div');
        el.id = 'mui-dashboard';
        document.getElementById('mui-main-body').appendChild(el);
    }

    return el;
}
