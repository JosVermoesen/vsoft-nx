/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from './../../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';

import { SupplierService } from '../services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginatedResult } from '../../../_models/pagination';
import { ISupplier } from '../models/supplier';

@Component({
  selector: 'vsoft-nx-suppliers-list',
  templateUrl: './suppliers-list.component.html'
})
export class SuppliersListComponent implements OnInit {
  spinner = false;

  numberOfRecords: number;
  totalRows: number;
  cols: any[];

  dataSource: ISupplier[];
  supplierParams: any = {};
  pagination: Pagination;

  idField: string;
  a100Field: string;
  a107Field: string;
  a104Field: string;

  constructor(
    private vSS: SupplierService,
    private as: AlertifyService,
    private route: ActivatedRoute,
    private ts: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ts.get('SUPPLIERS.idLabel').subscribe((res: string) => {
      this.idField = res;
    });
    this.ts.get('SUPPLIERS.a100Label').subscribe((res: string) => {
      this.a100Field = res;
    });
    this.ts.get('SUPPLIERS.a107Label').subscribe((res: string) => {
      this.a107Field = res;
    });
    this.ts.get('SUPPLIERS.a104Label').subscribe((res: string) => {
      this.a104Field = res;
    });

    this.cols = [
      { field: 'id', header: this.idField },
      { field: 'a100', header: this.a100Field },
      { field: 'a107', header: this.a107Field },
      { field: 'a104', header: this.a104Field }
    ];

    this.route.data.subscribe(data => {
      this.pagination = data.suppliers.pagination;
      this.numberOfRecords = this.pagination.totalItems;
      this.totalRows = this.pagination.itemsPerPage;
      this.dataSource = data.suppliers.result.slice();
      // console.log(this.dataSource);
      // this.dataMatSourceCustomers.sort = this.sort;
    });
    this.resetFilters();
  }

  resetFilters() {
    this.supplierParams.minA107 = '9310';
    this.supplierParams.maxA107 = '9310';
    this.loadDataPage();
  }

  loadDataPage() {
    this.spinner = true;
    this.vSS
      .getSuppliers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.supplierParams
      )
      .subscribe(
        (res: PaginatedResult<ISupplier[]>) => {
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

  selectForDetails(supplier: ISupplier) {
    // console.log(customer.id);
    // localStorage.setItem('customersessionid', customer.id);
    // this.router.navigate(['/customer/edit']);
    this.spinner = true;
    this.router.navigate(['/suppliers', supplier.id]);
  }

  selectForEdit(supplier: ISupplier) {
    this.spinner = true;
    // console.log(supplier.id);
    // localStorage.setItem('customersessionid', customer.id);
    this.router.navigate(['/suppliers/edit', supplier.id]);
  }

  addNew() {
    this.spinner = true;
    this.router.navigate(['/suppliers/new']);
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
