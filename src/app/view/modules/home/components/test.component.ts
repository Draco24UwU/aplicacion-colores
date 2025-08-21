import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestService } from '../../../../infrastructure/services/test.service';
import { GenericCommonService } from '../../../../infrastructure/common/generic.service';

@Component({
  selector: 'app-test',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: GenericCommonService,
      useExisting: TestService,
      multi: true, 
      deps: [TestService] 
    }
  ],
  template: `
    <h1>Soy test1</h1>
    <form [formGroup]="form">
      <input type="text" formControlName="value" />
    </form>
  `,
})
export class TestComponent {
  private readonly _service = inject(TestService);
  public form = this._service._generic.Forms.getForm({ key: 'test', reset: false });

  constructor() {}
}
