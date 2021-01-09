import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AlertifyService } from './../../../_services/alertify.service';
import { SupplierService } from '../services/supplier.service';
import { ISupplier } from '../models/supplier';

@Component({
  selector: 'vsoft-nx-supplier-new',
  templateUrl: './supplier-new.component.html'
})
export class SupplierNewComponent implements OnInit {
  primeSpinner = false;
  supplier: ISupplier;
  newForm: FormGroup;

  constructor(
    private router: Router,
    private vSS: SupplierService,
    private as: AlertifyService,
    private ts: TranslateService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createNewForm();
  }

  /* ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  } */

  createNewForm() {
    this.newForm = this.fb.group({
      id: ['', Validators.required],
      a100: ['', Validators.required],
      a107: ['', Validators.required],
      a108: ['', Validators.required],
      a161: ['', Validators.required]
    });
  }

  newRecord() {
    if (this.newForm.valid) {
      this.primeSpinner = true;
      this.supplier = Object.assign({}, this.newForm.value);
      this.vSS.newSupplier(this.supplier).subscribe(
        () => {
          this.ts.get('COMMON.alertAddSuccess').subscribe((res: string) => {
            this.as.success(res);
          });
          this.primeSpinner = false;
          this.router.navigate(['/suppliers/list']);
        },
        error => {
          console.log(error);
          this.ts.get('COMMON.alertAddEditFailure').subscribe((res: string) => {
            this.as.error(res);
          });
          this.primeSpinner = false;
        }
      );
    }
  }

  goBack() {
    this.primeSpinner = true;
    this.router.navigate(['/suppliers/list']);
  }
}
