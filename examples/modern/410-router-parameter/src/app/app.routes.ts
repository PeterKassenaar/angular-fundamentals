import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {AboutComponent} from './about/about.component';
import {CityComponent} from './city/city.component';
import {CityDetailComponent} from './city-detail/city-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'city',
    component: CityComponent
  },
  {
    // New route, with the dynamic parameters :id and :name
    // They are filled in city component and subsequently fetched in city-detail.component.ts from the route parameters
    path: 'detail/:id/:name',
    component: CityDetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
