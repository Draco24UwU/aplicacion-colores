import { FormGroup } from "@angular/forms";
import { Route } from "../../domain/models/api/api";
import { Inject, Injectable } from "@angular/core";
import { GenericFormsService } from "./generic-forms.service";
import { GenericApiService } from "./generic-api.service";


// * GenericCommon para definir las implementaciones de la clase.
export interface GenericCommon {
  forms?: Record<string, FormGroup>;
  api?: Record<string, Route>;
}

// * Servicio generico que tendra subservicios para cada feature.
@Injectable({ providedIn: 'any' })
export class GenericCommonService<T extends GenericCommon> {
    public Forms!: T extends { forms: Record<string, FormGroup> }
        ? GenericFormsService<NonNullable<T['forms']>>
        : undefined;
    public Api!: T extends { api: Record<string, Route> }
        ? GenericApiService<NonNullable<T['api']>>
        : undefined

    constructor(
        @Inject(GenericFormsService) formsService?: GenericFormsService<NonNullable<T['forms']>>,
        @Inject(GenericApiService) apiService?: GenericApiService<NonNullable<T['api']>>
    ) {
        if (formsService) {
            this.Forms = formsService as typeof this.Forms;
        }
        if (apiService) {
            this.Api = apiService as typeof this.Api;
        }
    }

    public setData(generic: GenericCommon): void {
        if (generic.forms && this.Forms) {
            this.Forms.setForms(generic.forms);
        }
        if (generic.api && this.Api) {
            this.Api.setRoutes(generic.api);
        }
    }
}

// * Funcion auxiliar.
export function createGenericService<T extends GenericCommon>(
  generic: T
): GenericCommonService<T> {
  const formsService = new GenericFormsService();
  const apiService = new GenericApiService();
  const service = new GenericCommonService(formsService, apiService);
  service.setData(generic);
  return service;
}
  