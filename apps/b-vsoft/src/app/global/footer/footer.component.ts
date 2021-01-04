import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'vsoft-nx-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  version: string = environment.version;
  year = new Date().getFullYear();
}
