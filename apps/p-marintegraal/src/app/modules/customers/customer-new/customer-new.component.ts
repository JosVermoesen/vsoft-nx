import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AlertifyService } from './../../../_services/alertify.service';
import { CustomerService } from '../services/customer.service';
import { ICustomer } from '../models/customer';

@Component({
  selector: 'vsoft-nx-customer-new',
  templateUrl: './customer-new.component.html'
})
export class CustomerNewComponent implements OnInit {
  primeSpinner = false;
  customer: ICustomer;
  newForm: FormGroup;

  constructor(
    private router: Router,
    private cS: CustomerService,
    private as: AlertifyService,
    private ts: TranslateService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createNewForm();
  }

  createNewForm() {
    this.newForm = this.fb.group({
      id: ['', Validators.required],
      a100: ['', Validators.required],
      a107: ['', Validators.required],
      a108: ['', Validators.required],
      v301: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
        ]
      ]
    });
  }

  newRecord() {
    if (this.newForm.valid) {
      this.primeSpinner = true;
      this.customer = Object.assign({}, this.newForm.value);
      this.cS.newCustomer(this.customer).subscribe(
        () => {
          this.ts.get('COMMON.alertAddSuccess').subscribe((res: string) => {
            this.as.success(res);
          });
          this.primeSpinner = false;
          this.router.navigate(['/customers/list']);
        },
        error => {
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
    this.router.navigate(['/customers/list']);
  }
}
