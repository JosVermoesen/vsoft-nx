import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AlertifyService } from '../../../_services/alertify.service';
import { LedgerAccountService } from '../services/ledgeraccount.service';
import { ILedgerAccount } from '../models/ledgerAccount';

@Component({
  selector: 'vsoft-nx-ledgeraccount-new',
  templateUrl: './ledgeraccount-new.component.html'
})
export class LedgerAccountNewComponent implements OnInit {
  primeSpinner = false;
  account: ILedgerAccount;
  newForm: FormGroup;

  constructor(
    private router: Router,
    private laS: LedgerAccountService,
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
      v020: ['', Validators.required]
    });
  }

  newRecord() {
    if (this.newForm.valid) {
      this.primeSpinner = true;
      this.account = Object.assign({}, this.newForm.value);
      this.laS.newLedgerAccount(this.account).subscribe(
        () => {
          this.ts.get('COMMON.alertAddSuccess').subscribe((res: string) => {
            this.as.success(res);
          });
          this.primeSpinner = false;
          this.router.navigate(['/ledgeraccounts/list']);
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
    this.router.navigate(['/ledgeraccounts/list']);
  }
}
