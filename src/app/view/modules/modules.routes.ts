import { Routes } from '@angular/router';
import { ModulesLayoutComponent } from './layout/modules.layout.component';

export const ModulesRoutes: Routes = [
  {
    path: '',
    component: ModulesLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then(m => m.HomeRoutes),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.routes').then(m => m.AboutRoutes),
      },
    ],
  },
];
