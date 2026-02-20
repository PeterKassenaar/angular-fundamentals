### Routing with Standalone Components in Angular

In modern Angular applications (v14+), standalone components simplify the way we handle lazy loading. Previously, lazy loading was tied to `NgModules` (Feature Modules). Now, it can be done directly with components or by loading a set of routes.

#### 1. Steps for Lazy Loading a Standalone Component

To lazy load a standalone component, you use the `loadComponent` property in your route configuration.

**Step-by-step:**
1. **Define a Standalone Component**: Ensure your component has `standalone: true`.
2. **Configure the Route**: In your `routes` array (usually in `app.routes.ts`), use `loadComponent` with a dynamic import.

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  {
    path: 'lazy',
    loadComponent: () => import('./lazy/lazy').then(m => m.LazyComponent),
  }
];
```

#### 2. Lazy Loading Nested Routes (Child Routes)

You can also lazy load a group of routes. This is similar to the old "Feature Module" approach but without the module.

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  {
    path: 'lazy',
    loadComponent: () => import('./lazy/lazy').then(m => m.LazyComponent),
    children: [
      {
        path: 'child',
        loadComponent: () => import('./lazy/lazy-child').then(m => m.LazyChildComponent),
      },
    ],
  },
];
```

#### 3. Comparison: Standalone vs. Feature Modules

| Feature | Traditional Feature Modules (NgModule) | Standalone Components |
| :--- | :--- | :--- |
| **Lazy Loading Trigger** | `loadChildren: () => import('./path').then(m => m.FeatureModule)` | `loadComponent: () => import('./path').then(m => m.Component)` |
| **Configuration** | Required a `router.module.ts` inside the feature module. | Configuration is usually done in a central `routes` file or by loading a separate routes file. |
| **Boilerplate** | High (Module, Router Module, Component declarations). | Low (Directly import the component). |
| **Dependency Management** | Dependencies were managed in the `NgModule`. | Dependencies are managed in the component's `imports` array. |
| **Nesting** | Needed `RouterModule.forChild(routes)` in the feature module. | Uses `children` array directly in the route object or `loadChildren` to load another `Routes` array. |

#### Summary of the "New" Way
With standalone components, you no longer need `router.module.ts` for every feature. Instead:
- If you want to lazy load a **single component**, use `loadComponent`.
- If you want to lazy load a **set of routes**, use `loadChildren: () => import('./feature/routes').then(m => m.FEATURE_ROUTES)`.

This makes the application architecture flatter and easier to navigate.
