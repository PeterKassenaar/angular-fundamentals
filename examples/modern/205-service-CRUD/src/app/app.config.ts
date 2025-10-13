import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {provideHttpClient} from "@angular/common/http";

import {routes} from './app.routes';

// Define the main application configuration object
export const appConfig: ApplicationConfig = {
  providers: [
    // Configure Zone.js change detection with event coalescing for better performance
    provideZoneChangeDetection({eventCoalescing: true}),
    // Register the application's routing configuration
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule) // You might also want to use  import {provideForms} from "@angular/forms" on top and provideForms() here. This is a backward compatible notation.
  ]
};

