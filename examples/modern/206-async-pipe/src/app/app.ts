import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { City } from './shared/model/city.model';
import { CityService } from './shared/services/city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private cityService = inject(CityService);
  private sanitizer = inject(DomSanitizer);

  // --- Signals for State ---
  protected selectedCity = signal<City | null>(null);

  // --- Signals from Observables (Data Sources) ---
  protected cities = toSignal(this.cityService.getCities(), { initialValue: [] });

  // A protected signal that holds the result of the async photo fetch (a blob or null).
  // It is derived from the selectedCity signal.
  protected photoBlob = toSignal(
    // 1. Convert the selectedCity signal to an observable.
    toObservable(this.selectedCity).pipe(
      // 2. Use switchMap to switch to a new inner observable when the city changes.
      switchMap(city => {
        if (!city) {
          return of(null); // If no city is selected, emit null.
        }
        const photoUrl = `assets/img/${city.name}.jpg`;
        // 3. Return the observable from the photo service.
        return this.cityService.getPhoto(photoUrl);
      })
    )
  );

  // --- Computed Signals (Derived State) ---
  protected cityPhoto = computed(() => {
    const blob = this.photoBlob();
    if (blob) {
      const objectURL = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return null;
  });

  // --- UI Actions ---
  showPhoto(city: City) {
    this.selectedCity.set(city);
  }
}
