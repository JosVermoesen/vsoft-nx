import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContract } from '../models/contract';

@Component({
  selector: 'vsoft-nx-customer-contracts',
  templateUrl: './customer-contracts.component.html',
  styleUrls: ['./customer-contracts.component.scss']
})
export class CustomerContractsComponent implements OnInit {
  cols: any[];
  dataSource: IContract;

  v223Field: string;
  a010Field: string;
  idField: string;
  vs99Field: string;
  vs98Field: string;

  constructor(private route: ActivatedRoute, private ts: TranslateService) {}

  ngOnInit() {
    this.ts.get('CUSTOMERS.v223Label').subscribe((res: string) => {
      this.v223Field = res;
    });
    this.ts.get('CUSTOMERS.a010Label').subscribe((res: string) => {
      this.a010Field = res;
    });
    this.ts.get('CUSTOMERS.idContract').subscribe((res: string) => {
      this.idField = res;
    });
    this.ts.get('CUSTOMERS.vs99Label').subscribe((res: string) => {
      this.vs99Field = res;
    });
    this.ts.get('CUSTOMERS.vs98Label').subscribe((res: string) => {
      this.vs98Field = res;
    });

    this.cols = [
      { field: 'v223', header: this.v223Field },
      { field: 'a010', header: this.a010Field },
      { field: 'id', header: this.idField },
      { field: 'vs99', header: this.vs99Field },
      { field: 'vs98', header: this.vs98Field }
    ];

    this.route.data.subscribe(data => {
      if (!(data === null)) {
        this.dataSource = data.customer.vsoftContracts.slice();
        // console.log(this.dataSource);
      }
    });
  }

  /* doFilterContracts(filterValue: string) {
    // this.dataMatSourceContracts.filter = filterValue.trim().toLocaleLowerCase();
  } */
}
