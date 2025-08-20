/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createFormsService, GenericFormsService } from './generic-forms';
import { FormGroup } from '@angular/forms';
import { Route } from '../../domain/models/api/api';
import { createApiService, GenericApiService } from './generic-api.service';

// * GenericCommon para definir las implementaciones de la clase.
export interface GenericCommon {
  forms?: Record<string, FormGroup>;
  api?: Record<string, Route>;
}

//*  Utilitario: genera las propiedades solo si existen en T
type PickGenericFeatures<T extends GenericCommon> = (T extends {
  forms: infer F;
}
  ? { Forms: GenericFormsService<NonNullable<F>> }
  : {}) &
  (T extends { api: infer A }
    ? { Api: GenericApiService<NonNullable<A>> }
    : {});

// * Tipo final del servicio
export type GenericCommonService<T extends GenericCommon> =
  PickGenericFeatures<T> & {
    setData(generic: GenericCommon): void;
  };

//* Factory
export function GenericCommonServiceFactory<T extends GenericCommon>(
  generic: T,
): GenericCommonService<T> {
  const service: any = {
    setData(g: GenericCommon) {
      if (g.forms) {
        if (!service.Forms)
          service.Forms = createFormsService<typeof g.forms>(g.forms);
        service.Forms.setForms(g.forms);
      }
      if (g.api) {
        if (!service.API) service.API = createApiService<typeof g.api>(g.api);
        service.API.setRoutes(g.api);
      }
    },
  };

  service.setData(generic);
  return service;
}

/*
*Pasos para agregar una nueva feat de clase.

* 1- Agregar la propiedad en GenericCommon

* 2- Registrar el tipo en GenericFeaturesMap

* 3- Extender setData con la lógica para instanciarlo.

* con eso ya debe funcionar el autocompletado en funcion de lo que pases como generic y el type

*/
