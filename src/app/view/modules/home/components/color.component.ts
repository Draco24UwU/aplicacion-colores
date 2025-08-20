import {
  Component,
  ElementRef,
  HostListener,
  input,
  viewChild,
} from '@angular/core';
import { color } from '../../../../domain/models/color/color';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color',
  imports: [CommonModule],
  template: `
    @let color = $color();
    <div
      #color_container
      tabindex="0"
      (click)="showColorMenu = true"
      (keyup.enter)="showColorMenu = true"
      [ngClass]="{ 'scale-105': showColorMenu }"
      class="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 relative hover:scale-105 hover:cursor-pointer flex items-center justify-center border-white border-solid border transition-all duration-200 ease-in-out"
      [style]="{ 'background-color': color.hex.cssString }"
    >
      <p
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        [ngClass]="{
          'text-white': color.isDarkColor,
          'text-black': !color.isDarkColor,
        }"
      >
        {{ showColorMenu ? '' : color.hex.cssString }}
      </p>

      <ul
        #menu
        class="h-10 w-10 md:h-15 md:w-15 lg:h-20 lg:w-20 relative flex items-center justify-center transition-transform duration-300 rounded-full "
        [ngClass]="{
          'opacity-0 rotate-0': !showColorMenu,
          'opacity-100 rotate-[360deg] menu-shadow rounded-full': showColorMenu,
        }"
      >
        <div
          #toogle
          class="h-10 w-10 md:h-15 md:w-15 lg:h-20 lg:w-20 absolute bg-white hover:bg-white/75 rounded-full flex items-center justify-center cursor-pointer"
          tabindex="0"
          (click)="onMenuClick($event)"
          (keyup.enter)="onMenuClick($event)"
          [ngClass]="{ hidden: !showColorMenu }"
        >
          <i class="fa-solid fa-bars text-black"></i>
        </div>
      </ul>
    </div>
  `,
})
export class ColorComponent {
  // ! Inputs y outputs and views.
  public $color = input.required<color>({ alias: 'color' });
  public $color_container =
    viewChild<ElementRef<HTMLDivElement>>('color_container');

  // ! Atributos del componente.
  public showColorMenu = false;

  // ! Metodos del componente.

  // * Metodo para escuchar los clicks en el documento.
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    this.colorContainerListener(event);
  }
  // * Metodo para escuchar el click en el componente, si se hace click fuera del color_container, se cierra el menu de ese color.
  public colorContainerListener(event: MouseEvent) {
    const color_container = this.$color_container();
    if (!color_container) return;

    //* Si el click no es dentro del color_container y el menu de color esta visible, se cierra.
    if (
      !color_container.nativeElement.contains(event.target as Node) &&
      this.showColorMenu
    ) {
      this.showColorMenu = false;
    }
  }

  public onMenuClick(event: Event) {
    event.stopPropagation();
    this.showColorMenu = false;
  }
}
