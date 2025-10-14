// city.orders.ts - A modern 'shopping basket' standalone component using signals.
import {Component, computed, inject, signal} from '@angular/core';
import {OrderService} from '../shared/services/order.service';
import {City} from '../shared/model/city.model';
import {CityOrderModel} from '../shared/model/cityOrders.model';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'city-orders',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    @if (totalOrders() > 0) {
      <h2>Your bookings:</h2>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Trip to:</th>
          <th>Number</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
          @for (order of currentOrders(); track $index) {
            <tr>
              <td>{{ order.city.name }}</td>
              <td>{{ order.numBookings }}</td>
              <td>{{ order.city.price | currency:'EUR':'symbol':'1.2-2' }}</td>
            </tr>
          }
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2">Total</td>
          <td><strong>{{ totalPrice() | currency:'EUR':'symbol':'1.2-2' }}</strong></td>
        </tr>
        </tfoot>
      </table>
      <button class="btn btn-outline-dark" (click)="cancel()">Cancel</button>
      <button class="btn btn-success" (click)="confirm()">Confirm</button>
    }
  `
})
export class CityOrdersComponent {
  // Inject **the same instance** of the OrderService, so we can listen to the stream.
  private orderService = inject(OrderService);

  // A signal to hold the array of orders.
  protected currentOrders = signal<CityOrderModel[]>([]);

  // A computed signal that derives the total price whenever the list of orders changes.
  protected totalPrice = computed(() => {
    return this.currentOrders().reduce((acc, order) => acc + order.numBookings * order.city.price, 0);
  });

  // A computed signal that derives the total number of orders.
  protected totalOrders = computed(() => this.currentOrders().length);

  constructor() {
    // Manually subscribe to the stream. This ensures we process every emission,
    // even if the emitted value is the same as the last one.
    this.orderService.Stream
      .subscribe({
        next: (city: City) => {
          console.log('Received order for city: ', city.name);
          // Add the new order to the existing list, creating a new array.
          this.currentOrders.update(orders => [...orders, new CityOrderModel(city)]);
        }
      });
  }

  // Reset the orders list to an empty array.
  cancel() {
    this.currentOrders.set([]);
  }

  // In a real app, you would send the final order list to a backend service.
  confirm() {
    alert('TODO: save order in database...');
  }
}
