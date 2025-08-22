import { inject, Injectable, signal } from '@angular/core';
import { GenericCommon } from './generic.service';
import { StatusService } from '../shared/services/status-component.service';
import { StatusData } from '../../domain/models/status/status.model';
import { Status } from '../../domain/models/api/api';


@Injectable({
    providedIn: 'root'
})
export class GenericModelService<T extends GenericCommon['model']> {
    // * Inyeccion de dependencias.
    private readonly _StatusService = inject(StatusService);

    // * Atributos del servicio.
    private $model = signal<T | null>(null);

    constructor() { }

    // * Metodos del servicio.
    public setModel(model: T): void {
        this.$model.set(model);
        // * Cuando se establecen N modelos, se actualiza el estado del StatusService.
        if (model) this.setModelAndStatusToStatusService(model);
    }
    public getModel<K extends keyof T>(model: K) {
        const mod = this.$model();
        const modelData = mod![model];

        return {
            ...modelData,
            toString: () => String(model)
        };
    }
    public getStatus<K extends keyof T, N extends keyof T[K]>(model: K, status: N){
        const mod = this.$model();
        return mod![model][status];
    }

    private setModelAndStatusToStatusService(model: T): void {
        if(!model) return;

        Object.entries(model).forEach(([model, buffer]) => {
            const convertedBuffer: Record<string, StatusData<string, string>> = {};
            Object.entries(buffer as Record<string, any>).forEach(([key, value]: [key: string, value: Status]) => {
                convertedBuffer[key] = {
                    label: value.config.label,
                    slug: value.config.slug,
                    field: value.config.field,
                    severity: value.config.severity,
                };

                console.log(`Status ${key} added to model ${model}:`, convertedBuffer[key]);
            });
            this._StatusService.addSates({ model, buffer: convertedBuffer });
        });
    }
        
}