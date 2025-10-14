import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {AboutComponent} from './about/about.component';
import {CityComponent} from './city/city.component';

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
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
