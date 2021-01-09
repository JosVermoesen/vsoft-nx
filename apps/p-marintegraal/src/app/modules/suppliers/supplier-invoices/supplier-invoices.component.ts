/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplierInvoice } from '../models/supplierInvoice';

@Component({
  selector: 'vsoft-nx-supplier-invoices',
  templateUrl: './supplier-invoices.component.html'
})
export class SupplierInvoicesComponent implements OnInit {
  cols: any[];
  dataSource: ISupplierInvoice[];

  idField: string;
  v035Field: string;
  v249Field: string;

  constructor(private route: ActivatedRoute, private ts: TranslateService) {}

  ngOnInit() {
    this.ts.get('SUPPLIERS.idInvoice').subscribe((res: string) => {
      this.idField = res;
    });
    this.ts.get('SUPPLIERS.v035Label').subscribe((res: string) => {
      this.v035Field = res;
    });
    this.ts.get('SUPPLIERS.v249Label').subscribe((res: string) => {
      this.v249Field = res;
    });

    this.cols = [
      { field: 'id', header: this.idField },
      { field: 'v035', header: this.v035Field },
      { field: 'v249', header: this.v249Field }
    ];

    this.route.data.subscribe(data => {
      if (!(data === null)) {
        this.dataSource = data.supplier.vsoftSupplierInvoices.slice();
        // console.log(this.dataSource);
      }
    });
  }

  /* doFilterInvoices(filterValue: string) {
    // this.dataMatSourceInvoices.filter = filterValue.trim().toLocaleLowerCase();
  } */
}
