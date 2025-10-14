// auth.guard.ts
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  // Your logic goes here.
  // In this simple example, we just check if the user is logged in.
  // We use a dummy authService for that.
  // NOTE: a guard MUST always return a boolean, or a Promise<boolean>.
  const authService = inject(AuthService)
  // return authService.isLoggedIn();
  //
  // More extensive example:
  // We want to redirect the user to the login page if he's not logged in.'
  // Then, we must return a UrlTree. This is provided by the Router.
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to login page and store the attempted URL as a queryParam.
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });

};
