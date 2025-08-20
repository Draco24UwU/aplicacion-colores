import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ColorGateway } from '../../../../domain/models/color/color-gateway';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { color, colorPalette } from '../../../../domain/models/color/color';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from './color.component';

@Component({
  selector: 'app-colors-menu',
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    ColorComponent,
    ButtonModule,
  ],
  template: `
    <div>
      <section class="flex gap-2">
        <p-select
          class="bg-black text-white"
          [options]="pallets"
          [(ngModel)]="selectedPalette"
          optionLabel="type"
          placeholder="Select a City"
        />
        <p-select
          class="bg-black text-white"
          [options]="[6, 12, 18, 24]"
          [(ngModel)]="selectedPalletteAmount"
          placeholder="Select amount of colors"
        />
        <p-button icon="fa-solid fa-repeat" (onClick)="newColors()" />
      </section>

      <section
        #colors_wraper
        class="flex items-center justify-center flex-wrap"
      >
        @for (color of colors; track color.rgb.string) {
          <app-color
            [color]="color"
            [style.animationDelay]="!color.state ? $index * 50 + 'ms' : '0ms'"
            [class.fade-in-up]="!color.state"
            [class.fade-in-close]="color.state === 'closing'"
          />
        }
      </section>
    </div>
  `,
})
export class ColorsMenuComponent {
  // * Inyeccion de dependencias.
  private readonly _color = inject(ColorGateway);
  // * Atributos del componente.
  public colors: color[] = [];
  public pallets: colorPalette[] = [
    {
      type: 'neutral',
      config: {
        l: { base: 0.5, variation: 0.1 },
        c: { base: 0.2, variation: 0.1 },
        h: { base: 0, variation: 360 },
      },
    },
    {
      type: 'cool',
      config: {
        l: { base: 0.5, variation: 0.1 },
        c: { base: 0.2, variation: 0.1 },
        h: { base: 240, variation: 30 },
      },
    },
    {
      type: 'warm',
      config: {
        l: { base: 0.5, variation: 0.1 },
        c: { base: 0.2, variation: 0.1 },
        h: { base: 30, variation: 30 },
      },
    },
    {
      type: 'pastel',
      config: {
        l: { base: 0.85, variation: 0.05 },
        c: { base: 0.1, variation: 0.05 },
        h: { base: 0, variation: 360 },
      },
    },
    {
      type: 'sunset',
      config: {
        l: { base: 0.6, variation: 0.15 },
        c: { base: 0.3, variation: 0.1 },
        h: { base: 20, variation: 60 },
      },
    },
  ];
  public colors_wraper = viewChild<ElementRef<HTMLElement>>('colors_wraper');
  public selectedPalette = signal<colorPalette>(this.pallets[0]);
  public selectedPalletteAmount = signal<number>(6);
  public selectedPalleteMonochromatic = signal<boolean>(true);

  constructor() {
    effect(() => {
      const selected = this.selectedPalette();
      const amount = untracked(() => this.selectedPalletteAmount());
      if (selected) {
        this.colors = this._color.generateColors({
          amount: amount,
          params: selected.config,
          monochromatic: true,
        });
      }
    });

    effect(() => {
      const amount = this.selectedPalletteAmount();
      const colors = this.colors;
      const selected = untracked(() => this.selectedPalette());

      // * Si ya existe una paleta seleccionada, en funcion del amount se agregaran o quitaran colores a la paleta existente.
      if (selected) {
        const adjusted = this._color.adjustColors(colors, amount);
        //* Si hay elementos marcados como closing, programar su eliminación
        const closingItems = adjusted.filter(c => c.state === 'closing');
        if (closingItems.length) {
          // Paso 1: actualiza el estado para que Angular pinte la clase
          this.colors = adjusted;

          // Paso 2: después de un tick (para asegurar render)
          setTimeout(() => {
            this.colors = adjusted.filter(c => c.state !== 'closing');
          }, 300);
        } else {
          this.colors = adjusted;
        }
      }
    });
  }

  public newColors() {
    this.colors = this._color.generateColors({
      amount: this.selectedPalletteAmount(),
      params: this.selectedPalette().config,
      monochromatic: true,
    });
  }
}
