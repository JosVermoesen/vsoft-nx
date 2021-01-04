import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'vsoft-nx-modal-office-info',
  templateUrl: './modal-office-info.component.html',
})
export class ModalOfficeInfoComponent {
  title: string;

  constructor(public bsModalRef: BsModalRef) { }

}
