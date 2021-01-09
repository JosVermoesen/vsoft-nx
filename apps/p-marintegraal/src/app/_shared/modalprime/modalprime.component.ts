import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { MarDef } from '../../_models/marDef';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'vsoft-nxmodalprime',
  templateUrl: './modalprime.component.html'
})
export class ModalPrimeComponent implements OnInit {
  fieldSize = '50%';
  modalField: MarDef;
  valueOfField: string;
  labelOfField: string;
  cardTitle: string;

  isRequiredLabel: string;
  isNotRequiredLabel: string;

  dialogForm: FormGroup;

  canEdit = false;
  fieldType: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ts: TranslateService
  ) {}

  public ngOnInit(): void {
    this.ts.get('MODALPRIME.fieldRequired').subscribe(res => {
      this.isRequiredLabel = res;
    });
    this.ts.get('MODALPRIME.fieldNotRequired').subscribe(res => {
      this.isNotRequiredLabel = res;
    });

    this.modalField = this.config.data.returnval;
    this.cardTitle = this.config.data.returnval.description;
    this.valueOfField = this.config.data.valueOfField;
    // if more then one field!!!
    this.labelOfField = this.config.header;

    if (this.modalField.required) {
      this.labelOfField = this.isRequiredLabel;
      this.dialogForm = this.fb.group({
        fieldVal: [this.valueOfField, Validators.required]
      });
    } else {
      this.labelOfField = this.isNotRequiredLabel;
      this.dialogForm = this.fb.group({
        fieldVal: [this.valueOfField]
      });
    }
    this.canEdit = this.modalField.canEdit;
    switch (this.modalField.fieldType) {
      case 'S':
        this.fieldType = 'text';
        if (this.modalField.fieldMin) {
          const minLen = this.modalField.fieldMin;
          const maxLen = this.modalField.fieldMax;
          this.labelOfField = this.isRequiredLabel;
          this.dialogForm = this.fb.group({
            fieldVal: [
              this.valueOfField,
              [
                Validators.required,
                Validators.minLength(minLen),
                Validators.maxLength(maxLen)
              ]
            ]
          });
        } else {
          if (this.modalField.required) {
            const maxLen = this.modalField.fieldMax;
            this.labelOfField =  this.isRequiredLabel;
            this.dialogForm = this.fb.group({
              fieldVal: [
                this.valueOfField,
                [Validators.required, Validators.maxLength(maxLen)]
              ]
            });
          } else {
            this.labelOfField = this.isNotRequiredLabel;
            const maxLen = this.modalField.fieldMax;
            this.dialogForm = this.fb.group({
              fieldVal: [this.valueOfField, [Validators.maxLength(maxLen)]]
            });
          }
        }
        break;

      case 'D':
        this.fieldType = 'number';
        if (this.modalField.fieldMin) {
          const minLen = this.modalField.fieldMin;
          const maxLen = this.modalField.fieldMax;
          this.labelOfField = this.isRequiredLabel;
          this.dialogForm = this.fb.group({
            fieldVal: [
              this.valueOfField,
              [
                Validators.required,
                Validators.min(minLen),
                Validators.max(maxLen)
              ]
            ]
          });
        } else {
          if (this.modalField.required) {
            const maxLen = this.modalField.fieldMax;
            this.labelOfField = this.isRequiredLabel;
            this.dialogForm = this.fb.group({
              fieldVal: [
                this.valueOfField,
                [Validators.required, Validators.max(maxLen)]
              ]
            });
          } else {
            const maxLen = this.modalField.fieldMax;
            this.labelOfField = this.isNotRequiredLabel;
            this.dialogForm = this.fb.group({
              fieldVal: [this.valueOfField, [Validators.max(maxLen)]]
            });
          }
        }
        break;
    }
  }

  onSubmit() {
    if (this.dialogForm.valid) {
      switch (this.dialogForm.value.fieldVal) {
        case '':
          this.ref.close('empty');
          break;

        default:
          this.ref.close(this.dialogForm.value.fieldVal);
          break;
      }
    }
  }

  onCanceled() {
    this.ref.close('cancel');
  }
}
