import { Injectable } from '@angular/core';
import { GenericCommon} from '../common/generic.';
import { FormControl, FormGroup } from '@angular/forms';
import { RouteGlobal } from '../../domain/models/api/api';
import { createGenericService } from '../common/generic.service';

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
   public readonly _generic = createGenericService(Generic);
  
    constructor() {
      this._generic.Api.request('test2').then(response => console.log(response));
    }
}
