import { AlertifyService } from './../../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginatedResult } from '../../../_models/pagination';
import { ICustomer } from '../models/customer';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'vsoft-nx-customers-list',
  templateUrl: './customers-list.component.html'
})
export class CustomersListComponent implements OnInit {
  spinner = false;

  pdfHeader = [['Client Number', 'Family Name', 'Postal Code', 'Street']]
  pdfColumns = [];

  numberOfRecords: number;
  totalRows: number;
  cols: any[];

  dataSource: ICustomer[];
  customerParams: any = {};
  pagination: Pagination;

  constructor(
    private cS: CustomerService,
    private as: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'Client Number' },
      { field: 'a100', header: 'Family Name' },
      { field: 'a107', header: 'Postal Code' },
      { field: 'a104', header: 'Street' }
    ];

    this.route.data.subscribe(data => {
      this.pagination = data.customers.pagination;
      this.numberOfRecords = this.pagination.totalItems;
      this.totalRows = this.pagination.itemsPerPage;
      this.dataSource = data.customers.result.slice();
      // console.log(this.dataSource);
      // this.dataMatSourceCustomers.sort = this.sort;
    });
    this.resetFilters();
  }

  resetFilters() {
    this.customerParams.minA107 = '9310';
    this.customerParams.maxA107 = '9310';
    this.loadDataPage();
  }

  loadDataPage() {
    this.spinner = true;
    this.cS
      .getCustomers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.customerParams
      )
      .subscribe(
        (res: PaginatedResult<ICustomer[]>) => {
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

  selectForDetails(customer: ICustomer) {
    // console.log(customer.id);
    // localStorage.setItem('customersessionid', customer.id);
    // this.router.navigate(['/customer/edit']);
    this.spinner = true;
    this.router.navigate(['/customers', customer.id]);
  }

  selectForEdit(customer: ICustomer) {
    this.spinner = true;
    // console.log(customer.id);
    // localStorage.setItem('customersessionid', customer.id);
    this.router.navigate(['/customers/edit', customer.id]);
  }

  addNew() {
    this.spinner = true;
    this.router.navigate(['/customers/new']);
  }

  pageChanged(event: any): void {
    this.pagination.itemsPerPage = event.rows;
    this.pagination.currentPage = event.first / event.rows + 1;
    this.loadDataPage();
  }

  doFilter(filterValue: string) {
    // this.dataMatSourceCustomers.filter = filterValue.trim().toLocaleLowerCase();
  }

  exportPdf() {
    const pdfDoc = new jsPDF();

    pdfDoc.setFontSize(18);
    pdfDoc.text('My PDF Table', 11, 8);
    pdfDoc.setFontSize(11);
    pdfDoc.setTextColor(100);

    this.dataSource.forEach(rec => {
      const temp = [rec.id, rec.a100, rec.a107, rec.a104];
      this.pdfColumns.push(temp);
      // console.log('Rows', this.exportColumns); // showing all data
    });

    /* pdfDoc.autoTable({
      head: this.pdfHeader,
      body: this.pdfColumns,
    }); */

    // Open PDF document in new tab
    pdfDoc.output('dataurlnewwindow')

    // Download PDF document
    // pdfDoc.save('table.pdf');
  }
}
