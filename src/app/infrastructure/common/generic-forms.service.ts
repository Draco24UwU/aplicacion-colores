/* eslint-disable @angular-eslint/prefer-inject */
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getFormConfig } from '../../domain/models/generic/generic-forms';

@Injectable({providedIn: 'any'})
export class GenericFormsService<TForms extends Record<string, FormGroup>> {
  // * Inyeccion de dependencias.
  public readonly _fb: FormBuilder = inject(FormBuilder);

  // * Atributos.
  protected $forms!: WritableSignal<TForms>;

  // * Metodos.
  public getForm<K extends keyof TForms>(config: getFormConfig<K>): TForms[K] {
    const form = this.$forms()[config.form];
    if (config.reset) form.reset();
    return form;
  }
  public setForms(forms: TForms) {
    this.$forms = signal(forms);
  }
}

// * Factory function.
export function createFormsService<T extends Record<string, FormGroup>>(
  forms: T,
): GenericFormsService<T> {
  const service = new GenericFormsService<T>();
  service.setForms(forms);
  return service;
}
