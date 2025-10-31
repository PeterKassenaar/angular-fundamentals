// Import Component decorator and signal function from Angular core
import {Component, signal} from '@angular/core';
// Import City model class for type definition
import {City} from './shared/city.model';
import {FormsModule} from '@angular/forms';

// Component decorator defining metadata for the root component
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    // Importing the FormsModule is required for the [(ngModel)] directive!
    FormsModule
  ],
  styleUrl: './app.css'
})
export class App {
  // Signal containing an array of strings representing cities.
  protected cities = signal<City[]>([
    new City(1, 'Groningen', 'Groningen'),
    new City(2, 'Hengelo', 'Overijssel'),
    new City(3, 'Den Haag', 'Zuid-Holland'),
    new City(4, 'Enschede', 'Overijssel'),
  ]);

  protected newCity= signal<string>('');
  protected newCityExtended= signal<string>('');

  checkMe($event: any) {
    this.newCityExtended.set($event.target.value);
  }
}
