import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestService } from '../../../../infrastructure/services/test.service';
import { StatusComponent } from '../../../../infrastructure/shared/components/status.component.component';
@Component({
  selector: 'app-test',
  imports: [ReactiveFormsModule, StatusComponent],
  template: `
    <!-- <h1>Soy test1</h1> -->
    <form [formGroup]="form">
      <!-- <input type="text" formControlName="value" /> -->

      <app-status [model]="_service.model" status="activo" />
      <app-status [model]="_service.model" status="activo" />
      <app-status [model]="_service.model" status="inactivo" />
    </form>
  `,
})
export class TestComponent {
  public readonly _service = inject(TestService);
  public form = this._service._generic.Forms.getForm({ form: 'test', reset: false });

  constructor() {}
}
