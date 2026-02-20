import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'lazy',
    loadComponent: () => import('./lazy/lazy').then((m) => m.LazyComponent),
    children: [
      {
        path: 'child',
        loadComponent: () => import('./lazy/lazy-child').then((m) => m.LazyChildComponent),
      },
    ],
  },
];
