import { Injectable, signal } from '@angular/core';
import { GenericCommon } from './generic.service';

@Injectable({
    providedIn: 'root'
})
export class GenericStoreService<T extends GenericCommon['store']>{
    // * Atributos del servicio.
    private $store = signal<T | null>(null);

    // * Metodo del servicio.
    public setStore(store: T): void {
        this.$store.set(store);
    }

    public getStore<K extends keyof T>(store: K) {
        const st = this.$store();
        return st![store];
    }
}