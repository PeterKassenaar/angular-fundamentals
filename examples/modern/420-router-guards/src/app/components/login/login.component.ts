import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // injectin of router services to navigate.
  router = inject(Router);
  route = inject(ActivatedRoute);

  // dummy data for the form. Of course we could also use signals.
  username: any;
  password: any;

  // Call this function if the login succeeds. Then use
  // the provided returnUrl to navigate back to the originally requested page.

  onLoginSuccess() {
    // Get the return URL from the query params
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // Navigate back to the originally requested page
    this.router.navigateByUrl(returnUrl);
  }

  onSubmit() {
    alert('dummy submit for username and password')
  }
}
