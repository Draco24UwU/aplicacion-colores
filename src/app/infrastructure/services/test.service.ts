import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouteGlobal } from '../../domain/models/api/api';
import { createGenericService, GenericCommon } from '../common/generic.service';

const Generic = {
  forms: {
    test: new FormGroup({
      value: new FormControl('hola'),
    }),
  },
  api: {
    test1: new RouteGlobal<string>({
      url: 'https://fakestoreapi.com/products/1',
      method: 'GET',
    }),
  },
} satisfies GenericCommon;

@Injectable({
  providedIn: 'root',
})
export class TestService {
  public readonly _generic = createGenericService(Generic);

  constructor() {
    this._generic.Api.request('test1').then(response => console.log(response));
    this._generic.Forms.getForm({key: 'test', reset: false});
  }
}
