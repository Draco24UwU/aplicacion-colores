import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouteGlobal, Status, Store } from '../../domain/models/api/api';
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
  model: {
    test_model: {
      "activo": new Status({ label: 'Activo', slug: 'activo', field: 'active', severity: 'success' }),
      "inactivo": new Status({ label: 'Inactivo', slug: 'inactivo', field: 'active', severity: 'warn' }),
    },
  },
  store: {
    "test_store": new Store<number[], undefined>({details: {data: [], buffer: {}}}),
    "test_store2": new Store()
  }
} satisfies GenericCommon;

@Injectable({
  providedIn: 'root',
})
export class TestService {
  // * Servicio generico.
  public readonly _generic = createGenericService(Generic);

  // * Atributos del componente.
  public model = this._generic.Model.getModel('test_model').toString();
  public store = this._generic.Store.getStore('test_store');

  constructor() {
    this._generic.Api.request('test1').then(response => console.log(response));
    this._generic.Forms.getForm({form: 'test', reset: false});   
  }
}
