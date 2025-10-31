import { Component, signal, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// Import City model and CityService
import { City } from './shared/model/city.model';
import { CityService } from './shared/services/city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Inject the CityService and DomSanitizer
  private cityService = inject(CityService);
  private sanitizer = inject(DomSanitizer);

  // Instead of converting the Observable of cities to a Signal, we subscribe to the
  // Observable and keep the data in a plain array property that the template binds to.
  protected cities: City[] = [];

  // NOTE: You can also achieve the same with Signals, e.g.:
  // protected cities = toSignal(this.cityService.getCities(), { initialValue: [] });

  protected currentCity = signal<City | null>(null);
  // cityPhoto is a writable signal. We will manually update its value.
  protected cityPhoto = signal<SafeUrl | string>('');

  constructor() {
    // Subscribe to the Observable returned by the service and assign the result.
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  // Method to update the current city and fetch its photo.
  // This is a so called *imperative* approach where we subscribe to the observable.
  updateCity(city: City) {
    this.currentCity.set(city);
    const photoUrl = `assets/img/${city.name}.jpg`;

    // We must subscribe to the observable to get the photo.
    this.cityService.getPhoto(photoUrl).subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      // Manually set the value of the cityPhoto signal.
      this.cityPhoto.set(safeUrl);
    });
  }
}
