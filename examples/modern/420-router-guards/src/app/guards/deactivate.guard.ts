// deactivate.guard.ts
import { CanDeactivateFn } from '@angular/router';

// This is an example of a guard that can be used to check
// if a component can be deactivated (for instance, there might be unsaved changes).
// We want to prevent users from accidentally navigating away if they have unsaved changes.


// Define an interface for components that can be deactivated
export interface CanDeactivateComponent {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const deactivateGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate();
};

