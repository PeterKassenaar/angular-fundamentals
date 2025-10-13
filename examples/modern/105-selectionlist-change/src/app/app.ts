import {Component, signal} from '@angular/core';
import {City} from './shared/city.model';

// Component decorator defining metadata for the root component
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
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

  // properties on this component
  protected currentCity = signal<City|null>(null);
  protected cityPhoto = signal<string>('');

  // change the current city and update the photo
  onCitySelected(event: Event) {
    const cityId = (event.target as HTMLSelectElement).value;
    const selectedCity = this.cities().find(city => city.id === +cityId);

    // If a city is selected, update the currentCity and cityPhoto signals.
    if (selectedCity) {
      this.currentCity.set(selectedCity);
      const imageFilename = `assets/img/${selectedCity.name}.jpg`;
      this.cityPhoto.set(imageFilename);
    }
  }
}
