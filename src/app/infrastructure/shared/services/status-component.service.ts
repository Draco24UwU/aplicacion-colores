import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { StateData, StatusData } from '../../../domain/models/status/status.model';

@Injectable({
    providedIn: 'root',
})
export class StatusService {
    private $states: WritableSignal<Record<string, Record<string, StatusData>>> = signal({});

    public addSates({ model, buffer }: StateData): void {
        if (model in this.$states()) return;
        this.$states.update((prev: Record<string, Record<string, StatusData>>) => ({ ...prev, [model]: buffer }));
    }

    public get states(): Record<string, Record<string, StatusData>> {
        return this.$states();
    }

    constructor() {
        effect(() => {
            console.log('StatusService states:', this.$states());
        });
    }
}