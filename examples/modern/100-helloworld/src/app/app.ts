import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Creates a reactive signal that holds the application title string.
  // The signal is read-only (readonly) and accessible within
  // this component and its children (protected). This is needed, because
  // the title is used in the template!
  // Signals are Angular's built-in reactive primitives for managing state changes.
  protected readonly title = signal('Angular 20-app');
}
