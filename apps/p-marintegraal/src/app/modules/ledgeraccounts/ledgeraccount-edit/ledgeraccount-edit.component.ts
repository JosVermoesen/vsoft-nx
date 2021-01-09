import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';

import { ModalPrimeComponent } from '../../../_shared/modalprime/modalprime.component';

import { AlertifyService } from '../../../_services/alertify.service';
import { MarDef } from '../../../_models/marDef';
import { LedgerAccountService } from '../services/ledgeraccount.service';
import { ILedgerAccount } from '../models/ledgerAccount';

@Component({
  selector: 'vsoft-nx-ledgeraccount-edit',
  templateUrl: './ledgeraccount-edit.component.html'
})
export class LedgerAccountEditComponent implements OnInit {
  accountDefs: MarDef[];

  selectedDefs: MarDef[];
  selectedDef: MarDef;
  selectedDefsData: string[];

  singleRecord: ILedgerAccount;

  isEdited = false;
  primeSpinner = false;
  // viewAll: boolean;

  constructor(
    private router: Router,
    private laS: LedgerAccountService,
    public ds: DialogService,
    private as: AlertifyService,
    private ts: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.singleRecord = data.account;
      // console.log (this.singleRecord);
      this.ts.get('marDef.DEF003').subscribe((res: MarDef[]) => {
        this.accountDefs = res;
        this.refreshAll();
      });
    });
  }

  updateRecord() {
    this.primeSpinner = true;
    this.laS.updateLedgerAccount(this.singleRecord).subscribe(
      () => {
        this.ts.get('COMMON.alertEditSuccess').subscribe((res: string) => {
          this.as.success(res);
        });
        this.primeSpinner = false;
        this.router.navigate(['/ledgeraccounts/list']);
      },
      error => {
        this.ts.get('COMMON.alertAddEditFailure').subscribe((res: string) => {
          this.as.error(res);
        });
        this.ts.get('COMMON.alertNoChanges').subscribe((res: string) => {
          this.as.warning(res);
        });
        this.isEdited = false;
        this.primeSpinner = false;
      }
    );
  }

  backToList() {
    this.router.navigate(['/ledgeraccounts/list']);
  }

  refreshAll() {
    if (localStorage.getItem('DEF003_Selected') === null) {
      this.selectedDefs = this.accountDefs;
    } else {
      this.selectedDefs = JSON.parse(localStorage.getItem('DEF003_Selected'));
    }
    this.refreshJson();
  }

  refreshJson() {
    const lengthOfDefs = this.selectedDefs.length;
    this.selectedDefsData = [];
    for (let i = 0, len = lengthOfDefs; i < len; i++) {
      const selected: MarDef = this.selectedDefs[i];
      const value = this.singleRecord[selected.fieldNameDB];
      this.selectedDefsData.push(value);
    }
  }

  openModal(returnval: MarDef) {
    const initialState = {
      header: returnval.description,
      width: '50',
      data: {
        returnval,
        valueOfField: this.singleRecord[returnval.fieldNameDB]
      }
    };
    const ref = this.ds.open(ModalPrimeComponent, initialState);

    ref.onClose.subscribe((res: string) => {
      if (res) {
        switch (res) {
          case 'cancel':
            break;

          case 'empty':
            this.singleRecord[returnval.fieldNameDB] = '';
            this.isEdited = true;
            this.refreshJson();
            break;

          default:
            this.singleRecord[returnval.fieldNameDB] = res;
            this.isEdited = true;
            this.refreshJson();
            break;
        }
      }
    });
  }

  handleChange(e) {
    if (e.index === 0) {
      this.backToList();
    } else {
      if (e.index === 1) {
        this.refreshAll();
      }
    }
  }
}
