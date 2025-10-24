// Import Component decorator and signal function from Angular core
import {Component, HostListener, signal} from '@angular/core';
// Import City model class for type definition
import {City} from './shared/city.model';

// Component decorator defining metadata for the root component
@Component({
  selector: 'app-root',      // CSS selector used to identify this component in HTML
  templateUrl: './app.html', // External HTML template file location
  styleUrl: './app.css'     // External CSS styles file location
})
export class App {
  // Signal containing an array of strings representing cities.
  protected cities = signal<string[]>(['Groningen', 'Hengelo', 'Den Haag', 'Enschede']);

  protected counter = signal<number>(0);
  protected txtKeyUp = signal<string>('');

  // Empty constructor for the App component, so we might as well delete it.
  constructor() {
  }

  // 1. Bind to click-event in the page
  btnClick() {
    this.counter.update(value => value + 1);
    // If you want to use the signal value in an alert, you can do this:
    // alert(`You clicked ${this.counter()} time(s)`);
  }

  // 2. Bind to keyUp-event in the textbox
  onKeyUp(event: any) {
    this.txtKeyUp.update(val => event.target.value);
  }

  // 3. Bind to keyUp-event via local template variable
  betterKeyUp() {
    //... do nothing, for now
  }

  // 4. Binding to non-DOM events
  @HostListener('window:offline', ['$event'])
  onOffline(event: any) {
    console.log('You are offline!');
    // Do something else, for instance, use a red background color.
    // document.body.style.backgroundColor = 'red';
  }

  @HostListener('window:online', ['$event'])
  onOnline(event: any) {
    console.log('You are online again!');
    // Do something else, for instance, use a green background color.
    // document.body.style.backgroundColor = 'green';
  }

  // 5. adding a new city to the array with cities.
  addCity(txtNewCity: HTMLInputElement) {
    this.cities.update(cities => [...cities, txtNewCity.value]);
  }
}
