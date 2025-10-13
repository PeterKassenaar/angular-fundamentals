// Import Component decorator and signal function from Angular core
import {Component, signal} from '@angular/core';
// Import City model class for type definition
import {City} from './shared/city.model';

// Component decorator defining metadata for the root component
@Component({
  selector: 'app-root',      // CSS selector used to identify this component in HTML
  templateUrl: './app.html', // External HTML template file location
  styleUrl: './app.css'     // External CSS styles file location
})
export class App {

  // Signal holding the user's name as a string
  protected name = signal<string>('Peter Kassenaar');

  // Signal holding the current city as a string
  protected city = signal<string>('Groningen');

  // Signal containing an array of strings representing cities.
  protected cities = signal<string[]>(['Groningen', 'Hengelo', 'Den Haag', 'Enschede']);

  // Signal containing an array of City objects with id, name, and province
  // So now the cities are based on a model class instead of plain strings.
  // NOTE: We could also use the ngOninit() method for that.
  protected citiesFromModel = signal<City[]>([
    new City(1, 'Groningen', 'Groningen'),
    new City(2, 'Hengelo', 'Overijssel'),
    new City(3, 'Den Haag', 'Zuid-Holland'),
    new City(4, 'Enschede', 'Overijssel'),
  ]);

  // Empty constructor for the App component, so we might as well delete it.
  constructor() {
  }
}
