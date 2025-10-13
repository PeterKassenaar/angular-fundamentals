import { Component, signal, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
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

  // Signals for state management
  protected cities = signal<City[]>([]);
  protected currentCity = signal<City | null>(null);
  protected cityPhoto = signal<SafeUrl | string>('');
  protected isListLoading = signal<boolean>(false); // For the initial list load
  protected isPhotoLoading = signal<boolean>(false); // For loading the city photo

  constructor() {
    // Fetch initial city data, show loading indicator while fetching.
    this.isListLoading.set(true);
    this.cityService.getCities()
      .pipe(finalize(() => this.isListLoading.set(false))) // Ensure list loading is set to false
      .subscribe(cities => {
        this.cities.set(cities);
      });
  }

  // Method to update the current city and fetch its photo.
  updateCity(city: City) {
    this.currentCity.set(city);
    this.cityPhoto.set(''); // Clear previous photo
    const photoUrl = `assets/img/${city.name}.jpg`;

    this.isPhotoLoading.set(true);
    this.cityService.getPhoto(photoUrl)
      .pipe(finalize(() => this.isPhotoLoading.set(false))) // Ensure photo loading is set to false to update the UI.
      .subscribe(blob => {
        const objectURL = URL.createObjectURL(blob);
        const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.cityPhoto.set(safeUrl);
      });
  }
}
