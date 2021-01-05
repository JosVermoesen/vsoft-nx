import { Component } from '@angular/core';

import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vsoft-nx-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBars = faBars;
}
