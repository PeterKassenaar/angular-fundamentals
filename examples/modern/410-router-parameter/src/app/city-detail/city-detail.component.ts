import {Component, inject} from '@angular/core';
import {CityService} from '../shared/services/city.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [],
  templateUrl: './city-detail.component.html',
  styleUrl: './city-detail.component.css'
})
export class CityDetailComponent {
  private route = inject(ActivatedRoute);
  private cityService = inject(CityService);

  // Whenever the route parameters change, get the 'id',
  // then use switchMap to call the service to fetch the city data.
  // toSignal converts the resulting observable into a signal for the template.
  city = toSignal(
    this.route.paramMap.pipe(
      // switchMap() cancels previous HTTP requests if the route parameters change,
      // preventing race conditions. It takes the route params and returns a new
      // Observable from cityService.getCity().
      // Hence we 'switch' from a param (=id) to a city (=Groningen, for instance)
      switchMap(params => {
        const id = Number(params.get('id')); // convert to number, because this is what the cityService expects.
        return this.cityService.getCity(id);
      })
    )
  );
}
