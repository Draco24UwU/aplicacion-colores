import { FormGroup } from "@angular/forms";
import { Route, Status, Store } from "../../domain/models/api/api";
import { Inject, Injectable } from "@angular/core";
import { GenericFormsService } from "./generic-forms.service";
import { GenericApiService } from "./generic-api.service";
import { GenericModelService } from "./generic-status.service";
import { GenericStoreService } from "./generic-store.service";


// * GenericCommon para definir las implementaciones de la clase.
export interface GenericCommon {
  forms?: Record<string, FormGroup>;
  api?: Record<string, Route>;
  model?: Record<string, Record<string, Status>>;
  store?: Record<string, Store>; 
}

// * Servicio generico que tendra subservicios para cada feature.
@Injectable({ providedIn: 'any' })
export class GenericCommonService<T extends GenericCommon> {
    public Forms!: T extends { forms: T['forms'] }
        ? GenericFormsService<NonNullable<T['forms']>>
        : undefined;
    public Api!: T extends { api: T['api'] }
        ? GenericApiService<NonNullable<T['api']>>
        : undefined;
    public Model!: T extends { model: T['model'] }
        ? GenericModelService<NonNullable<T['model']>>
        : undefined;
    public Store!: T extends { store: T['store'] }
        ? GenericStoreService<NonNullable<T['store']>>
        : undefined;

    constructor(
        @Inject(GenericFormsService) formsService?: GenericFormsService<NonNullable<T['forms']>>,
        @Inject(GenericApiService) apiService?: GenericApiService<NonNullable<T['api']>>,
        @Inject(GenericModelService) statusService?: GenericModelService<NonNullable<T['model']>>,
        @Inject(GenericStoreService) storeService?: GenericStoreService<NonNullable<T['store']>>
    ) {
        if (formsService) this.Forms = formsService as typeof this.Forms;
        if (apiService) this.Api = apiService as typeof this.Api;
        if (statusService) this.Model = statusService as typeof this.Model;
        if (storeService) this.Store = storeService as typeof this.Store;
    }

    public setData(generic: GenericCommon): void {
        if (generic.forms && this.Forms) this.Forms.setForms(generic.forms);
        if (generic.api && this.Api) this.Api.setRoutes(generic.api);
        if (generic.model && this.Model) this.Model.setModel(generic.model);
        if (generic.store && this.Store) this.Store.setStore(generic.store);
    }
}

// * Funcion auxiliar.
export function createGenericService<T extends GenericCommon>(
  generic: T
): GenericCommonService<T> {
  const formsService = new GenericFormsService<NonNullable<T['forms']>>();
  const apiService = new GenericApiService<NonNullable<T['api']>>();
  const statusService = new GenericModelService<NonNullable<T['model']>>();
  const storeService = new GenericStoreService<NonNullable<T['store']>>();
  const service = new GenericCommonService(formsService, apiService, statusService, storeService);
  service.setData(generic);
  return service;
}
  