// city.detail.ts
import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {City} from '../shared/model/city.model';

@Component({
  selector: 'city-detail',
  template: `
    @if (city) {
      <h2>City details</h2>
      <button (click)="rate(1)" class="btn btn-sm btn-success">+1</button>
      <button (click)="rate(-1)" class="btn btn-sm btn-danger">-1</button>
      <button (click)="favorite()" class="btn btn-sm btn-outline-dark">favorite</button>
      @if (city.favorite) {
        <span class="badge bg-info float-end">Favorite!</span>
      }
      <ul class="list-group">
        <li class="list-group-item">Name: {{ city.name }}</li>
        <li class="list-group-item">Province: {{ city.province }}</li>
        <li class="list-group-item">
          <img src="assets/img/{{ city.name }}.jpg" alt="City Photo" class="img-fluid">
        </li>
      </ul>
    }
  `
})

export class CityDetail {
  // the current city is retrieved from the parent component.
  @Input() city: City | null = null;
  @Output() fav = new EventEmitter<boolean>();
  @Output() rating = new EventEmitter<number>();

  rate(num: number) {
    console.log('rating for ', this.city?.name, ': ', num);
    this.rating.emit(num);
  }

  favorite() {
    if (this.city) {
      console.log('toggling favorite for ', this.city.name);
      this.fav.emit(!this.city.favorite);
    }
  }
}

/*
NOTE FOR STUDENTS (Signal-based inputs):
A modern and efficient way to handle this scenario is to pass the signal
from the parent component directly to the child component. This uses a new feature in Angular
called "Signal Inputs".

Instead of passing the *value* of the signal (e.g., `currentCity()`), you pass the
signal *object* itself. The child component's input is defined using the `input()`
function, which creates a signal that automatically updates when the parent signal changes.

Here is how you would modify the files to implement this:

1. Update this file (city-detail.ts) to use the `input()` function:
   Note that you must call the signal like a function in the template (e.g., `city()`).

// city-detail.ts (Signal Input version)
import { Component, input } from '@angular/core'; // <-- Import 'input'
import { City } from '../shared/model/city.model';

@Component({
  selector: 'city-detail',
  template: `
    @if (city()) {
      <h2>City details</h2>
      <ul class="list-group">
        <li class="list-group-item">Name: {{ city()?.name }}</li>
        <li class="list-group-item">Province: {{ city()?.province }}</li>
        <li class="list-group-item">
          <img src="assets/img/{{ city()?.name }}.jpg" alt="City Photo" class="img-fluid">
        </li>
      </ul>
    }
  `
})
export class CityDetailWithSignalInput {
  // Use the `input()` function to create a signal input.
  // This creates a readonly signal 'city' that mirrors the parent signal.
  city = input<City | null>(null);
}


2. Update the parent component's template (app.html) to pass the signal directly.
   Notice there are no parentheses `()` after `currentCity`.

// app.html
// ...
// <city-detail [city]="currentCity()"></city-detail>  <-- BEFORE
   <city-detail [city]="currentCity"></city-detail>      <-- AFTER
// ...

This approach is often preferred over the traditional @Input() with signals because it's
more explicit and can lead to better performance optimizations by Angular's change detection.
*/
