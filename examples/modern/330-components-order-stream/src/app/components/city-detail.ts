// city.detail.ts
import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {City} from '../shared/model/city.model';
import {CurrencyPipe} from '@angular/common';
import {OrderService} from '../shared/services/order.service';

@Component({
  selector: 'city-detail',
  imports: [
    CurrencyPipe
  ],
  template: `
    @if (city) {
      <h2>City details</h2>
      <button (click)="rate(1)" class="btn btn-sm btn-success">+1</button>
      <button (click)="rate(-1)" class="btn btn-sm btn-danger">-1</button>
      <ul class="list-group">
        <li class="list-group-item">Name: {{ city.name }}</li>
        <li class="list-group-item">Province: {{ city.province }}</li>
        <li class="list-group-item">
          <img src="assets/img/{{ city.name }}.jpg" alt="City Photo" class="img-fluid">
        </li>
      </ul>
      <h2>Price for a weekend city trip:
        {{ city.price | currency:'EUR':'symbol':'1.2' }}
        <button class="btn btn-lg btn-info"
                (click)="order(city)">Order now!
        </button>
      </h2>
    }
  `
})

export class CityDetail {
  // the current city is retrieved from the parent component.
  @Input() city: City | null = null;
  @Output() rating = new EventEmitter<number>();

  // inject the order service
  orderService = inject(OrderService);

  rate(num: number) {
    console.log('rating for ', this.city?.name, ': ', num);
    this.rating.emit(num);
  }

  order(city: City) {
    console.log('order for ', city.name);
    // put the city on the order stream, so it can be picked up by the parent component.
    this.orderService.Stream.next(city);
  }
}
