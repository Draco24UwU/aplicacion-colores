import { Injectable, OnInit } from '@angular/core';
import { RouteGlobal } from '../../../../domain/models/api/api';
import {
  GenericCommon,
  GenericCommonServiceFactory,
} from '../../../../infrastructure/common/generic.';

const Generic = {
  api: {
    test2: new RouteGlobal<number>({
      url: 'https://fakestoreapi.com/products',
      method: 'GET',
    }),
  },
} satisfies GenericCommon;

@Injectable({ providedIn: 'root' })
export class TestService {
  public readonly _Generic = GenericCommonServiceFactory(Generic);
}
