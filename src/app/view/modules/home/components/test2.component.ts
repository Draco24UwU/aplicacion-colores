import { Component, inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { TestService2 } from '../../../../infrastructure/services/test2.service';
import { GenericCommonService } from '../../../../infrastructure/common/generic.service';
import { TestService } from '../../../../infrastructure/services/test.service';

@Component({
  selector: 'app-test2',
  imports: [ReactiveFormsModule],
    providers: [
      {
        provide: GenericCommonService,
        useExisting: TestService,
        multi: true, 
        deps: [TestService], 
      }
    ],
  template: `
    <h1>Soy test2</h1>
    <form [formGroup]="form">
      <input type="text" formControlName="value" />
    </form>
  `,
})
export class Test2Component {
  private readonly _service = inject(TestService2);
  public form = this._service._generic.Forms.getForm({ key: 'test', reset: false });

  constructor() {}

}
