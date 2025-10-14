import {inject, Injectable} from '@angular/core';
import {delay, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {City} from '../model/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  // Dependency Injection from HttpClient. The necessary changes were
  // also made in the app.config.ts file. Here, the HttpClient is injected.
  private http = inject(HttpClient);

  // return all cities
  getCities(): Observable<City[]> {
    return this.http.get<City[]>('assets/data/cities.json');
  }

  // return a single city
  getCity(id: number): Observable<City | undefined> {
    return this.getCities().pipe(
      delay(1000), // simulate a delay of 1 second
      map((cities: City[]) => cities.find(city => city.id === id))
    );
  }
}
