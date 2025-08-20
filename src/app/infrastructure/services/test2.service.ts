import { inject, Injectable, InjectionToken } from '@angular/core';
import { GenericCommon, GenericCommonService } from '../common/generic.';
import { FormControl, FormGroup } from '@angular/forms';
import { RouteGlobal } from '../../domain/models/api/api';

export const GENERIC_SERVICE = new InjectionToken<
  GenericCommonService<typeof Generic>
>('GENERIC_SERVICE');

export const Generic = {
  forms: {
    test: new FormGroup({
      value: new FormControl('hola2'),
    }),
  },
  api: {
    test2: new RouteGlobal<number>({
      url: 'https://fakestoreapi.com/products',
      method: 'GET',
    }),
  },
} satisfies GenericCommon;

@Injectable({
  providedIn: 'root',
})
export class TestService2 {
  public readonly _generic = inject(GENERIC_SERVICE);
}
