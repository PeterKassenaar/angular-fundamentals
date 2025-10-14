import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CanDeactivateComponent} from '../../guards/deactivate.guard';

@Component({
  selector: 'app-profile-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements CanDeactivateComponent {
  profile = {
    name: '',
    email: ''
  };

  isDirty = false;

  canDeactivate(): boolean {
    if (this.isDirty) {
      return window.confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Save logic here
      this.isDirty = false;
    }
  }

  // Track form changes
  ngOnInit() {
    setTimeout(() => {
      const originalValue = JSON.stringify(this.profile);
      document.addEventListener('input', () => {
        this.isDirty = originalValue !== JSON.stringify(this.profile);
      });
    });
  }

}
