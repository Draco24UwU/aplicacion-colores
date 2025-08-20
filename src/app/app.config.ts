import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';
import { ColorGateway } from './domain/models/color/color-gateway';
import { ColorService } from './infrastructure/services/color.service';
import Aura from '@primeuix/themes/aura';

// * Configuracion de rutas de la app.
// auth: rutas publicas.
// app: rutas privadas.
// Guard de la app --> canMatch: [authGuard],
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./view/modules/modules.routes').then(m => m.ModulesRoutes),
  },
];

// * Configuracion general de la app.
// * En app config definimos quien resuelve los casos de uso, de los servicios de infrastructura, etc.
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),

    // * Proveer los casos de uso.
    { provide: ColorGateway, useClass: ColorService },
  ],
};
