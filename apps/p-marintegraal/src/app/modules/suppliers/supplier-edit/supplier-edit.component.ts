import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';

import { ModalPrimeComponent } from '../../../_shared/modalprime/modalprime.component';

import { AlertifyService } from './../../../_services/alertify.service';
import { MarDef } from './../../../_models/marDef';
import { SupplierService } from '../services/supplier.service';
import { ISupplier } from '../models/supplier';

export interface SelectOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'vsoft-nx-supplier-edit',
  templateUrl: './supplier-edit.component.html'
})
export class SupplierEditComponent implements OnInit {
  supplierDefs: MarDef[];

  selectedDefs: MarDef[];
  selectedDef: MarDef;
  selectedDefsData: string[];

  singleRecord: ISupplier;

  isEdited = false;
  primeSpinner = false;
  // viewAll: boolean;

  // A10CS: SelectOptions[]; // Language to select
  // A102S: SelectOptions[]; // Title to select

  constructor(
    private router: Router,
    private sS: SupplierService,
    public ds: DialogService,
    private as: AlertifyService,
    private ts: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.singleRecord = data.supplier;
      // console.log(this.singleRecord);
      this.ts.get('marDef.DEF002').subscribe((res: MarDef[]) => {
        this.supplierDefs = res;
        this.refreshAll();
      });
    });
  }

  updateRecord() {
    this.primeSpinner = true;
    this.sS.updateSupplier(this.singleRecord).subscribe(
      () => {
        this.ts.get('COMMON.alertEditSuccess').subscribe((res: string) => {
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
        this.ts.get('COMMON.alertNoChanges').subscribe((res: string) => {
          this.as.warning(res);
        });
        this.isEdited = false;
        this.primeSpinner = false;
      }
    );
  }

  backToList() {
    this.router.navigate(['/suppliers/list']);
  }

  refreshAll() {
    if (localStorage.getItem('DEF002_Selected') === null) {
      this.selectedDefs = this.supplierDefs;
    } else {
      this.selectedDefs = JSON.parse(localStorage.getItem('DEF002_Selected'));
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
