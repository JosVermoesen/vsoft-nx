import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'vsoft-nx-html-modal',
  templateUrl: './html-modal.component.html',
  styleUrls: ['./html-modal.component.scss']
})
export class HtmlModalComponent implements OnInit {
  title: string;
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  select() {
    this.bsModalRef.hide();
  }
}
