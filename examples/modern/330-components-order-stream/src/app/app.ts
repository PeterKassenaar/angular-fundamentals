// Import Component, signal, and inject from Angular core
import {Component, signal, inject, effect} from '@angular/core';
// Import City model and CityService
import { City } from './shared/model/city.model';
import { CityService } from './shared/services/city.service';
import {CityDetail} from './components/city-detail';
import {CityOrdersComponent} from './components/city-orders';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    CityDetail,
    CityOrdersComponent
  ],
  styleUrl: './app.css'
})
export class App {
  // Inject the CityService (OLD: using constructor injection. NEW: using dependency injection with inject()).
  private cityService = inject(CityService);

  // Signals for cities, current city, and city photo
  protected cities = this.cityService.getCities();
  protected currentCity = signal<City | null>(null);
  protected cityPhoto = signal<string>('');

  constructor() {
    // Below is a signal() **effect()**. It runs whenever the cities() signal changes.
    effect(() => {
      // It ensures that the currentCity signal always holds the latest
      // object reference after an update (e.g., rating or favorite change).

      // The **effect()** is a special function that runs code whenever a signal it depends on is changed.
      // In this case, the effect watches the main cities
      // list. When that list is updated (e.g., after you change a favorite status), the effect immediately
      // finds the new version of the currently selected city and updates the currentCity signal
      const current = this.currentCity();
      if (current) {
        // Find the updated city object in the new cities array.
        const updatedCity = this.cities().find(c => c.id === current.id);
        if (updatedCity) {
          // Reselect the city to update the currentCity signal with the new object reference.
          this.currentCity.set(updatedCity);
        }
      }
    });
  }

  // Method to update the current city and photo
  updateCity(city: City) {
    this.currentCity.set(city);
    const imageFilename = `assets/img/${city.name}.jpg`;
    this.cityPhoto.set(imageFilename);
  }

  clearCity() {
    // reset current city and photo, so that detail component is hidden.
    this.currentCity.set(null);
    this.cityPhoto.set('');
  }

  /**
   * Handles the rating change event emitted by the CityDetail component.
   * It receives a number (the change in rating, e.g., +1 or -1).
   * The method then calls the CityService to update the rating for the currently selected city.
   * @param change The amount to change the rating by.
   */
  updateRating(change: number) {
    const current = this.currentCity();
    if (current) {
      // because the update is handled via the service, the component signal automatically recieves a new value/state.
      this.cityService.updateRating(current.id, change);
    }
  }

  /**
   * Handles the favorite status change event emitted by the CityDetail component.
   * It receives a boolean representing the new favorite status.
   * The method then calls the CityService to update the favorite status for the currently selected city.
   * @param isFavorite The new favorite status.
   */
  updateFavorite(isFavorite: boolean) {
    const current = this.currentCity();
    if (current) {
      this.cityService.updateFavorite(current.id, isFavorite);
    }
  }
}
