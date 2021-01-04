import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'vsoft-nx-office-info-modal',
  templateUrl: './office-info-modal.component.html',
})
export class OfficeInfoModalComponent {
  title: string;

  constructor(public bsModalRef: BsModalRef) {}

}
