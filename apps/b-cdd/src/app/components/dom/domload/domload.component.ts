import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { DomEntry } from './../../../_models/domEntry';

@Component({
  selector: 'vsoft-nx-domload',
  templateUrl: './domload.component.html',
  styleUrls: ['./domload.component.css']
})
export class DomLoadComponent implements OnInit {
  title: string;
  closeBtnName: string;
  locationReload = false;
  iCount: number;

  domLoadForm: FormGroup;
  domJson: DomEntry[];

  localStorageItems = [];
  localStorageItemValues = [];

  public onSelected: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.onChangeGroupType('cddClient_');
    this.onSelected = new Subject();
  }

  onChangeGroupType(groupType) {
    const domToSearch = groupType; // 'cddClient_';
    const lengthOfSearch = domToSearch.length;
    this.localStorageItems = [];
    this.localStorageItemValues = [];
    for (let i = 0, len = localStorage.length; i < len; i++) {
      const key = localStorage.key(i);
      if (key.substring(0, lengthOfSearch) === domToSearch) {
        const value = localStorage[key];
        const itemDescription = key.substring(lengthOfSearch);
        this.localStorageItems.push(itemDescription);
        this.localStorageItemValues.push(value);

        // console.log(domToSearch + itemDescription + ' (key)' + ' => ' + value);
      } else {
        // skip
      }
    }
    this.localStorageItems.sort();
    this.domLoadForm = this.fb.group({
      groupType: [groupType, Validators.required],
      name: [this.localStorageItems[0], Validators.required],
      replaceEntries: [false],
      deleteAfterLoading: [false]
    });
  }

  onSubmit() {
    if (this.domLoadForm.valid) {
      const areThereEntries = localStorage.getItem('cddEntries_Template');
      this.locationReload = true;
      const itemName =
        this.domLoadForm.value.groupType + this.domLoadForm.value.name;

      if (this.domLoadForm.value.replaceEntries) {
        localStorage.removeItem('cddEntries_Template');

        this.domJson = JSON.parse(localStorage.getItem(itemName));
        localStorage.setItem(
          'cddEntries_Template',
          JSON.stringify(this.domJson)
        );
      } else {
        if (areThereEntries) {
          this.domJson = JSON.parse(
            localStorage.getItem('cddEntries_Template')
          );
        }
        const tmpJson: DomEntry[] = JSON.parse(localStorage.getItem(itemName));

        if (areThereEntries === null) {
          this.domJson = tmpJson;
        } else {
          this.iCount = 0;
          while (this.iCount < tmpJson.length) {
            const tmpEntry: DomEntry = tmpJson[this.iCount];
            this.domJson.unshift(tmpEntry);
            this.iCount++;
          }
        }

        localStorage.setItem(
          'cddEntries_Template',
          JSON.stringify(this.domJson)
        );

        if (this.domLoadForm.value.deleteAfterLoading === true) {
          localStorage.removeItem(itemName);
        }
      }
      this.onSelected.next(true);
      this.bsModalRef.hide();
    }
  }
}
