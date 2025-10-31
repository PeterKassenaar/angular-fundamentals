// Import Component decorator and signal function from Angular core
import {Component, signal} from '@angular/core';
// Import City model class for type definition
import {City} from './shared/city.model';

// Component decorator defining metadata for the root component
// @ts-ignore
@Component({
  selector: 'app-root',      // CSS selector used to identify this component in HTML
  templateUrl: './app.html', // External HTML template file location
  styleUrl: './app.css'     // External CSS styles file location
})
export class App {
  // Signal containing an array of strings representing cities.
  protected cities = signal<City[]>([
    new City(1, 'Groningen', 'Groningen'),
    new City(2, 'Hengelo', 'Overijssel'),
    new City(3, 'Den Haag', 'Zuid-Holland'),
    new City(4, 'Enschede', 'Overijssel'),
  ]);

  protected currentCity = signal<City|null>(null);
  protected cityPhoto = signal<string>('');

  updateCity(city: City) {
    console.log(`Updating city: ${city.name}`);
    this.currentCity.set(city);

    // Create the image filename. Please note that also bundling the `assets/img` folder is required
    // in angular.json
    const imageFilename = `assets/img/${city.name}.jpg`;
    this.cityPhoto.set(imageFilename);
  }
}
