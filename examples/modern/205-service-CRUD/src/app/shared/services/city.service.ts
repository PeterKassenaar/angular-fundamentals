import {inject, Injectable} from '@angular/core';
import {delay, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {City} from '../model/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:3000/cities'; // Base URL for the cities API
  private http = inject(HttpClient);

  // GET: Fetches all cities from the server.
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl)
      .pipe(delay(1500)); // simulate a delay of 1.5 seconds, to show the spinner
  }

  // GET: Fetches a single city by its ID.
  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${id}`);
  }

  // POST: Adds a new city to the database.
  addCity(city: Omit<City, 'id'>): Observable<City> {
    return this.http.post<City>(this.apiUrl, city);
  }

  // PUT: Updates an existing city in the database.
  updateCity(city: City): Observable<City> {
    return this.http.put<City>(`${this.apiUrl}/${city.id}`, city);
  }

  // DELETE: Removes a city from the database by its ID.
  deleteCity(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

