import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusData } from '../../../domain/models/status/status.model'; 
import { TagModule } from 'primeng/tag';
import { StatusService } from '../services/status-component.service';

@Component({
    selector: 'app-status',
    imports: [
        CommonModule,
        TagModule,
    ],
    template: `
        @let data = $data();
        @if (data) {
            <p-tag
                class="text-xxs"
                [value]="data.label"
                [ngClass]="{
                    'bg-green-100 text-green-500': data.severity === 'success',
                    'bg-sky-100 text-sky-500': data.severity === 'info',
                    'bg-amber-100 text-amber-500': data.severity === 'warn',
                    'bg-red-100 text-red-500': data.severity === 'danger',
                    'bg-slate-100 text-slate-700': data.severity === 'secondary',
                    'bg-zinc-950 text-zinc-50': data.severity === 'contrast',
                }"
            />
        }
    `,
})
export class StatusComponent {
    private readonly _status: StatusService = inject(StatusService);

    public $model: InputSignal<string> = input.required({ alias: 'model' });
    public $status: InputSignal<string> = input.required({ alias: 'status' });
    public $data: Signal<StatusData | null> = computed(() => {
        const model: string = this.$model();
        const status: string = this.$status();

        if (!model || !this._status.states[model]) return null;
        if (!status || !this._status.states[model][status]) return null;

        return this._status.states[model][status];
    });

    constructor() {}
}