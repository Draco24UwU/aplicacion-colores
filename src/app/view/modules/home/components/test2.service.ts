import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RouteGlobal } from '../../../../domain/models/api/api';
import {
  GenericCommon,
  GenericCommonServiceFactory,
} from '../../../../infrastructure/common/generic.';

const Generic = {
  forms: {
    test: new FormGroup({
      value: new FormControl('HOLA DESDE TEST 2'),
    }),
  },
  api: {
    test2: new RouteGlobal<number>({
      url: 'https://fakestoreapi.com/products',
      method: 'GET',
    }),
  },
} satisfies GenericCommon;
@Injectable({ providedIn: 'root' })
export class Test2Service {
  public readonly _Generic =
    GenericCommonServiceFactory<typeof Generic>(Generic);

  constructor() {
    this._Generic.setData(Generic);
    console.log(
      this._Generic.Forms.getForm({ key: 'test', reset: false }).value,
    );
    setTimeout(() => {
      console.log(
        this._Generic.Forms.getForm({ key: 'test', reset: false }).value,
      );
    }, 5000);
  }
}
