import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsMenuComponent } from './components/colors-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './components/test.component';
import { Test2Component } from './components/test2.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ColorsMenuComponent,
    ReactiveFormsModule,
    TestComponent,
    Test2Component,
  ],
  template: `
    <app-colors-menu />
    <app-test />
    <app-test2 />
  `,
})
export class HomeComponent {}
