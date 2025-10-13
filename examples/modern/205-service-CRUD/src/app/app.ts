import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { City } from './shared/model/city.model';
import { CityService } from './shared/services/city.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private cityService = inject(CityService);

  // State signals
  protected cities = signal<City[]>([]);
  protected editingCity = signal<City | Omit<City, 'id'> | null>(null);
  protected viewingCity = signal<City | null>(null); // For the details panel
  protected isLoading = signal<boolean>(false); // For the main list
  protected isViewingLoading = signal<boolean>(false); // For the details panel

  constructor() {
    this.loadCities();
  }

  // --- Data Loading ---
  loadCities() {
    this.isLoading.set(true);
    this.cityService.getCities().subscribe(cities => {
      this.cities.set(cities);
      this.isLoading.set(false);
    });
  }

  // --- UI Actions ---
  showCityDetails(city: City) {
    this.editingCity.set(null); // Close edit form if open
    this.viewingCity.set(null); // Clear previous details
    this.isViewingLoading.set(true);

    this.cityService.getCityById(city.id)
      .pipe(finalize(() => this.isViewingLoading.set(false)))
      .subscribe(detailedCity => {
        this.viewingCity.set(detailedCity);
      });
  }

  startNewCity() {
    this.viewingCity.set(null); // Close details panel
    this.editingCity.set({ name: '', province: '', highlights: '', rating: 0 });
  }

  selectCity(city: City) {
    this.viewingCity.set(null); // Close details panel
    this.editingCity.set({ ...city });
  }

  cancelEdit() {
    this.editingCity.set(null);
  }

  // --- CRUD Operations ---
  deleteCity(city: City) {
    if (confirm(`Are you sure you want to delete ${city.name}?`)) {
      this.cityService.deleteCity(city.id).subscribe(() => {
        this.viewingCity.set(null); // Clear details panel if the deleted city was being viewed
        this.loadCities();
      });
    }
  }

  saveCity() {
    const cityToSave = this.editingCity();
    if (!cityToSave) return;

    if ('id' in cityToSave) {
      this.cityService.updateCity(cityToSave as City).subscribe(() => {
        this.loadCities();
        this.cancelEdit();
      });
    }
    else {
      this.cityService.addCity(cityToSave).subscribe(() => {
        this.loadCities();
        this.cancelEdit();
      });
    }
  }
}
