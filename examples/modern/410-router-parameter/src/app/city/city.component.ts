import {Component, inject, signal} from '@angular/core';
import {CityService} from '../shared/services/city.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {toSignal} from '@angular/core/rxjs-interop';
import {City} from '../shared/model/city.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-city',
  imports: [
    RouterLink
  ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
// Inject the CityService and DomSanitizer
  private cityService = inject(CityService);

  // Convert the Observable of cities to a Signal.
  protected cities = toSignal(this.cityService.getCities(), {initialValue: []});

}
