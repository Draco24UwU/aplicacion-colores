import { Component, inject } from '@angular/core';
import { TestService } from './test.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  imports: [ReactiveFormsModule],
  template: `
    <h1>Soy test1</h1>
    <!-- <form [formGroup]="form">
      <input type="text" formControlName="value" />
    </form> -->
  `,
})
export class TestComponent {
  private readonly _service = inject(TestService);

  constructor() {
    console.log('Hola mund 2o');
    this._service._Generic.Api.request('test2', {}).then(val => {
      console.log(val);
    });
  }
}
