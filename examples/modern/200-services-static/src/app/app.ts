// Import Component, signal, and inject from Angular core
import { Component, signal, inject } from '@angular/core';
// Import City model and CityService
import { City } from './shared/model/city.model';
import { CityService } from './shared/services/city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Inject the CityService (OLD: using constructor injection. NEW: using dependency injection with inject()).
  private cityService = inject(CityService);

  // Signals for cities, current city, and city photo
  protected cities = this.cityService.getCities();
  protected currentCity = signal<City | null>(null);
  protected cityPhoto = signal<string>('');

  // Method to update the current city and photo
  updateCity(city: City) {
    this.currentCity.set(city);
    const imageFilename = `assets/img/${city.name}.jpg`;
    this.cityPhoto.set(imageFilename);
  }
}
