import { InjectionToken } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { APIRoute } from '../api/api';
import { getFormConfig } from './generic-forms';

//* Token para las rutas API
export const API = new InjectionToken<Record<string, APIRoute>>('API_ROUTES');

//* Token para los formularios
export const FORMS = new InjectionToken<
  Record<string | number | symbol, FormGroup>
>('FORMS');

// * Interfaz para la implementacion del servicio.
export interface GenericCommonInterfaz<
  TForms extends Record<string, FormGroup>,
> {
  getForm<K extends keyof TForms>(config: getFormConfig<K>): TForms[K];
}
