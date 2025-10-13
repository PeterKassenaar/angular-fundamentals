import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {City} from '../model/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  // Dependency Injection from HttpClient
  private http = inject(HttpClient);

  // Private property to hold the cached city data.
  private cachedCities: City[] | null = null;

  // Returns all cities. Data is fetched from the server on the first call
  // and from the cache on subsequent calls.
  getCities(): Observable<City[]> {
    // If the cache exists, return it as an observable.
    if (this.cachedCities) {
      return of(this.cachedCities);
    }

    // If cache is empty, fetch from the server, with a 2-second delay.
    return this.http.get<City[]>('assets/data/cities.json').pipe(
      delay(2000),
      // Use the tap operator to store the fetched data in the cache.
      tap(cities => this.cachedCities = cities)
    );
  }

  // Fetches the binary image data from the provided URL with a 2-second delay.
  getPhoto(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      delay(2000)
    );
  }

  // Clears the internal cache.
  public clearCache(): void {
    this.cachedCities = null;
  }

  // Gets a single city by its ID. It uses the getCities() method,
  // which will leverage the cache.
  public getCityById(id: number): Observable<City | undefined> {
    return this.getCities().pipe(
      // Use the map operator to find the specific city in the array.
      map(cities => cities.find(city => city.id === id))
    );
  }
}
