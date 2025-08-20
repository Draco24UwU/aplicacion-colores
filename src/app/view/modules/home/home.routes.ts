import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {
  Generic,
  GENERIC_SERVICE,
} from '../../../infrastructure/services/test2.service';
import { GenericCommonServiceFactory } from '../../../infrastructure/common/generic.';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [
      {
        provide: GENERIC_SERVICE,
        useFactory: () => GenericCommonServiceFactory(Generic),
      },
    ],
  },
];
