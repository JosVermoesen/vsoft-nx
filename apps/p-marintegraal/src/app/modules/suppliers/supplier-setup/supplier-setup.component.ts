import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MarDef } from '../../../_models/marDef';

@Component({
  selector: 'vsoft-nx-suppliersetup',
  templateUrl: './supplier-setup.component.html'
})
export class SupplierSetupComponent implements OnInit {
  selectedDef: MarDef;
  selectedDefs: MarDef[];
  supplierDefs: MarDef[];
  viewFullList = false;

  constructor(private ts: TranslateService) {}

  ngOnInit() {
    this.ts.get('marDef.DEF002').subscribe((res: MarDef[]) => {
      this.supplierDefs = res;
    });

    if (localStorage.getItem('DEF002_Selected') === null) {
      // console.log('nothing selected');
    } else {
      // console.log('selected:');
      // console.log(JSON.parse(localStorage.getItem('DEF002_Selected')));
      this.selectedDefs = JSON.parse(localStorage.getItem('DEF002_Selected'));
    }
  }

  toggleFullList() {
    this.viewFullList = !this.viewFullList;
  }

  autoSave(selected: MarDef[]) {
    // console.log(selected);
    localStorage.setItem('DEF002_Selected', JSON.stringify(selected));
  }
}
