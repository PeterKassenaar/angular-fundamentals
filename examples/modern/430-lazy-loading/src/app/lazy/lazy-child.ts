import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-child',
  standalone: true,
  template: `
    <div class="lazy-child">
      <h3>Lazy Child Component!</h3>
      <p>I was loaded lazily from the parent Lazy Component.</p>
    </div>
  `,
  styles: [`
    .lazy-child {
      margin-top: 20px;
      padding: 10px;
      border: 1px dashed #3f51b5;
      background-color: #f0f2ff;
    }
    h3 { color: #e91e63; }
  `]
})
export class LazyChildComponent {}
