import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lazy',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h2>Lazy Component Loaded!</h2>
    <p>This component was loaded lazily via the router.</p>
    <p>You can also see this as the "Lazy Parent Component".</p>

    <nav>
      <a routerLink="child">Load Lazy Child</a>
    </nav>

    <hr>

    <router-outlet />
  `,
  styles: [`
    h2 { color: #3f51b5; }
    nav { margin-bottom: 10px; }
  `]
})
export class LazyComponent {}
