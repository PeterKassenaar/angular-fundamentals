import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  imports: [
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  navigate(number: number) {
    // this.router.navigate([number]);
  }
}
