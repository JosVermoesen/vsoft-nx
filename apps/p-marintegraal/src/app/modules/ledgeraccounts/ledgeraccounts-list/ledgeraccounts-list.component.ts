import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '../../../_services/alertify.service';
import { LedgerAccountService } from '../services/ledgeraccount.service';
import { ILedgerAccount } from '../models/ledgerAccount';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginatedResult } from '../../../_models/pagination';

@Component({
  selector: 'vsoft-nx-ledgeraccounts-list',
  templateUrl: './ledgeraccounts-list.component.html'
})
export class LedgerAccountsListComponent implements OnInit {
  spinner = false;

  numberOfRecords: number;
  totalRows: number;
  cols: any[];

  dataSource: ILedgerAccount[];
  accountParams: any = {};
  pagination: Pagination;

  idField: string;
  v020Field: string;
  dece022Field: string;
  dece023field: string;

  constructor(
    private laS: LedgerAccountService,
    private as: AlertifyService,
    private route: ActivatedRoute,
    private ts: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ts.get('ACCOUNTS.idLabel').subscribe((res: string) => {
      this.idField = res;
    });
    this.ts.get('ACCOUNTS.v020Label').subscribe((res: string) => {
      this.v020Field = res;
    });
    this.ts.get('ACCOUNTS.dece022Label').subscribe((res: string) => {
      this.dece022Field = res;
    });
    this.ts.get('ACCOUNTS.dece023Label').subscribe((res: string) => {
      this.dece023field = res;
    });

    this.cols = [
      { field: 'id', header: this.idField },
      { field: 'v020', header: this.v020Field },
      { field: 'dece022', header: this.dece022Field },
      { field: 'dece023', header: this.dece023field }
    ];

    this.route.data.subscribe(data => {
      this.pagination = data.accounts.pagination;
      this.numberOfRecords = this.pagination.totalItems;
      this.totalRows = this.pagination.itemsPerPage;
      this.dataSource = data.accounts.result.slice();
      // console.log(this.dataSource);
      // this.dataMatSourceCustomers.sort = this.sort;
    });
    this.resetFilters();
  }

  resetFilters() {
    this.accountParams.minA107 = '9310';
    this.accountParams.maxA107 = '9310';
    this.loadDataPage();
  }

  loadDataPage() {
    this.spinner = true;
    this.laS
      .getLedgerAccounts(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.accountParams
      )
      .subscribe(
        (res: PaginatedResult<ILedgerAccount[]>) => {
          this.dataSource = res.result;
          // console.log(this.dataSource);
          // console.log('Aantal records in selectie: ' + this.numberOfRecords);
          this.pagination = res.pagination;
          this.numberOfRecords = this.pagination.totalItems;
          this.totalRows = this.pagination.itemsPerPage;
          this.spinner = false;
        },
        error => {
          this.as.error(error);
          this.spinner = false;
        }
      );
  }

  selectForDetails(account: ILedgerAccount) {
    // console.log(customer.id);
    // localStorage.setItem('customersessionid', customer.id);
    // this.router.navigate(['/customer/edit']);
    this.spinner = true;
    this.router.navigate(['/ledgeraccounts', account.id]);
  }

  selectForEdit(account: ILedgerAccount) {
    this.spinner = true;
    // console.log(account.id);
    // localStorage.setItem('customersessionid', customer.id);
    this.router.navigate(['/ledgeraccounts/edit', account.id]);
  }

  addNew() {
    this.spinner = true;
    this.router.navigate(['/ledgeraccounts/new']);
  }

  pageChanged(event: any): void {
    this.pagination.itemsPerPage = event.rows;
    this.pagination.currentPage = event.first / event.rows + 1;
    this.loadDataPage();
  }

  doFilter(filterValue: string) {
    // this.dataMatSourceCustomers.filter = filterValue.trim().toLocaleLowerCase();
  }
}
