// Import core Angular configuration types and providers for error handling and change detection
import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';

// Import the router provider for handling navigation
import {provideRouter} from '@angular/router';
// Import the routes configuration from local file
import {routes} from './app.routes';

// Import the HttpClient provider for making HTTP requests
import {provideHttpClient} from "@angular/common/http";

// Define the main application configuration object
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient()
  ]
};
