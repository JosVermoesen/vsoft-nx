import { Component } from '@angular/core';
import { IbanCheck } from '@vsoft-nx/shared-ui';

@Component({
  selector: 'vsoft-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vsoft-nx';
  amount = '50';

  ibanToCheck = IbanCheck('BE62891854031961', true, false)
}
