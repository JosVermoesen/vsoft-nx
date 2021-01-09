import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MarDef } from '../../../_models/marDef';

@Component({
  selector: 'vsoft-nx-ledgeraccountsetup',
  templateUrl: './ledgeraccount-setup.component.html'
})
export class LedgerAccountSetupComponent implements OnInit {
  selectedDef: MarDef;
  selectedDefs: MarDef[];
  accountDefs: MarDef[];
  viewFullList = false;

  constructor(private ts: TranslateService) {}

  ngOnInit() {
    this.ts.get('marDef.DEF003').subscribe((res: MarDef[]) => {
      this.accountDefs = res;
    });

    if (localStorage.getItem('DEF003_Selected') === null) {
      // console.log('nothing selected');
    } else {
      // console.log('selected:');
      this.selectedDefs = JSON.parse(localStorage.getItem('DEF003_Selected'));
    }
  }

  toggleFullList() {
    this.viewFullList = !this.viewFullList;
  }

  autoSave(selected: MarDef[]) {
    // console.log(selected);
    localStorage.setItem('DEF003_Selected', JSON.stringify(selected));
  }
}
