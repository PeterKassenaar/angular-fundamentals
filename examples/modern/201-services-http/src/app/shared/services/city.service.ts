import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
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

  // Fetches the binary image data from the provided URL.
  getPhoto(url: string): Observable<Blob> {
    return this.http.get(url, {responseType: 'blob'});
  }
}
