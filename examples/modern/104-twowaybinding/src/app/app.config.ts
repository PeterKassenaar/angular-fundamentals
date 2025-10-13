// Import core Angular configuration types and providers for error handling and change detection
import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
// Import the router provider for handling navigation
import {provideRouter} from '@angular/router';

// Import the routes configuration from local file
import {routes} from './app.routes';

// Define the main application configuration object
export const appConfig: ApplicationConfig = {
  providers: [
    // Set up global error handling for the browser environment
    provideBrowserGlobalErrorListeners(),
    // Configure Zone.js change detection with event coalescing for better performance
    provideZoneChangeDetection({eventCoalescing: true}),
    // Register the application's routing configuration
    provideRouter(routes)
  ]
};
