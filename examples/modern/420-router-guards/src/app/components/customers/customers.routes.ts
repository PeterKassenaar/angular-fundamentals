import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'details',
    pathMatch: 'full'
  },
  {
    path: 'details',
    loadComponent: () => import('./customer-details/customer-details.component')
      .then(m => m.CustomerDetailsComponent)
  },
  {
    path: 'invoices',
    loadComponent: () => import('./customer-invoices/customer-invoices.component')
      .then(m => m.CustomerInvoicesComponent)
  }
];
