import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILedger } from '../models/ledger';

@Component({
  selector: 'vsoft-nx-ledgeraccount-ledgers',
  templateUrl: './ledgeraccount-ledgers.component.html'
})
export class LedgerAccountLedgersComponent implements OnInit {
  cols: any[];
  dataSource: ILedger[];

  v067Field: string;
  v035Field: string;
  v033Field: string;
  dece068Field: string;
  v069Field: string;

  constructor(private route: ActivatedRoute, private ts: TranslateService) {}

  ngOnInit() {
    this.ts.get('ACCOUNTS.v067Label').subscribe((res: string) => {
      this.v067Field = res;
    });
    this.ts.get('ACCOUNTS.v035Label').subscribe((res: string) => {
      this.v035Field = res;
    });
    this.ts.get('ACCOUNTS.v033Label').subscribe((res: string) => {
      this.v033Field = res;
    });
    this.ts.get('ACCOUNTS.dece068Label').subscribe((res: string) => {
      this.dece068Field = res;
    });
    this.ts.get('ACCOUNTS.v069Label').subscribe((res: string) => {
      this.v069Field = res;
    });

    this.cols = [
      { field: 'v067', header: this.v067Field },
      { field: 'v035', header: this.v035Field },
      { field: 'v033', header: this.v033Field },
      { field: 'dece068', header: this.dece068Field },
      { field: 'v069', header: this.v069Field }
    ];

    this.route.data.subscribe(data => {
      if (!(data === null)) {
        this.dataSource = data.account.vsoftLedgers.slice();
        // console.log(this.dataSource);
      }
    });
  }

  /* doFilterContracts(filterValue: string) {
    // this.dataMatSourceContracts.filter = filterValue.trim().toLocaleLowerCase();
  } */
}
