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

  // Method to get all cities as a readonly signal
  getCities() {
    return this.cities.asReadonly();
  }
}
