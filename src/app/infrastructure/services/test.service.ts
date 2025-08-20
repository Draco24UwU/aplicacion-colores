import { inject, Injectable } from '@angular/core';
import { GenericCommon, GenericCommonService } from '../common/generic.';
import { FormControl, FormGroup } from '@angular/forms';
import { RouteGlobal } from '../../domain/models/api/api';

const Generic = {
  forms: {
    test: new FormGroup({
      value: new FormControl('hola'),
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
export class TestService {}
