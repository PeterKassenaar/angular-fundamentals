// Import Injectable and signal from Angular core
import { Injectable, signal } from '@angular/core';
// Import City model class for type definition
import { City } from '../model/city.model';

// Injectable decorator marks it as a service that can be injected
@Injectable({
  providedIn: 'root'
})
export class CityService {
  // A private signal that holds the array of cities.
  // Using a signal in a service is a good practice for managing shared state.
  // When the state is exposed as a signal, any component that injects this service
  // can react to changes in the state in a fine-grained and efficient way.
  private cities = signal<City[]>([
    new City(1, 'Groningen', 'Groningen'),
    new City(2, 'Hengelo', 'Overijssel'),
    new City(3, 'Den Haag', 'Zuid-Holland'),
    new City(4, 'Enschede', 'Overijssel'),
  ]);

  // Below: the 'API' of this service.

  // Method to get all cities as a readonly signal
  getCities() {
    return this.cities.asReadonly();
  }

  // Get a single city by ID
  getCity(id: number): City | undefined{
    return this.cities().find(city => city.id === id);
  }

  // Delete a city by ID
  deleteCity(id: number): void {
    // TODO: Implement deleteCity method...
  }


  // Update the rating for a given city
  updateRating(cityId: number, change: number): void {
    this.cities.update(cities =>
      cities.map(city =>
        city.id === cityId
          // Create a new object for the updated city to maintain immutability
          ? { ...city, rating: city.rating + change }
          : city
      )
    );
  }

  // Update the favorite status for a given city
  updateFavorite(cityId: number, isFavorite: boolean): void {
    this.cities.update(cities =>
      cities.map(city =>
        city.id === cityId
          ? { ...city, favorite: isFavorite }
          : city
      )
    );
  }
  // etc...
}
