import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {City} from '../model/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  // Dependency Injection from HttpClient
  private http = inject(HttpClient);

  // return all cities with a 2-second delay
  getCities(): Observable<City[]> {
    return this.http.get<City[]>('assets/data/cities.json').pipe(
      delay(2000)
    );
  }

  // Fetches the binary image data from the provided URL with a 2-second delay.
  getPhoto(url: string): Observable<Blob> {
    return this.http.get(url, {responseType: 'blob'})
  }

  // Gets a single city by its ID.
  getCityById(id: number): Observable<City | undefined> {
    return this.getCities().pipe(
      map(cities => cities.find(city => city.id === id))
    );
  }
}
