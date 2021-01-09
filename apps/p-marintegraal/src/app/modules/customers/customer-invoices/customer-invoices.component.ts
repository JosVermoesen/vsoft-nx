import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerInvoice } from '../models/customerInvoice';

@Component({
  selector: 'vsoft-nx-customer-invoices',
  templateUrl: './customer-invoices.component.html',
  styleUrls: ['./customer-invoices.component.scss']
})
export class CustomerInvoicesComponent implements OnInit {
  cols: any[];
  dataSource: ICustomerInvoice[];

  idField: string;
  a000Field: string;
  v035Field: string;
  v249Field: string;

  constructor(private route: ActivatedRoute, private ts: TranslateService) {}

  ngOnInit() {
    this.ts.get('CUSTOMERS.idInvoice').subscribe((res: string) => {
      this.idField = res;
    });
    this.ts.get('CUSTOMERS.a000Label').subscribe((res: string) => {
      this.a000Field = res;
    });
    this.ts.get('CUSTOMERS.v035Label').subscribe((res: string) => {
      this.v035Field = res;
    });
    this.ts.get('CUSTOMERS.v249Label').subscribe((res: string) => {
      this.v249Field = res;
    });

    this.cols = [
      { field: 'id', header: this.idField },
      { field: 'a000', header: this.a000Field },
      { field: 'v035', header: this.v035Field },
      { field: 'v249', header: this.v249Field }
    ];

    this.route.data.subscribe(data => {
      if (!(data === null)) {
        // console.log(data.customer.vsoftCustomerInvoices.slice());
        this.dataSource = data.customer.vsoftCustomerInvoices.slice();
      }
    });
  }

  /* doFilterInvoices(filterValue: string) {
    // this.dataMatSourceInvoices.filter = filterValue.trim().toLocaleLowerCase();
  } */
}
