import { Component, inject } from '@angular/core';
import { Test2Service } from './test2.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test2',
  imports: [ReactiveFormsModule],
  template: `
    <h1>Soy test1</h1>
    <form [formGroup]="form">
      <input type="text" formControlName="value" />
    </form>
  `,
})
export class Test2Component {
  private readonly _service = inject(Test2Service);
  public form = this._service._Generic.Forms.getForm({
    key: 'test',
    reset: false,
  });
}
