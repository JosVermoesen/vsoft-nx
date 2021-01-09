import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MarDef } from '../../../_models/marDef';

@Component({
  selector: 'vsoft-nx-customersetup',
  templateUrl: './customer-setup.component.html',
  styleUrls: ['./customer-setup.component.css']
})
export class CustomerSetupComponent implements OnInit {
  selectedDef: MarDef;
  selectedDefs: MarDef[];
  customerDefs: MarDef[];
  viewFullList = false;

  constructor(private ts: TranslateService) {}

  ngOnInit() {
    this.ts.get('marDef.DEF001').subscribe((res: MarDef[]) => {
      this.customerDefs = res;
    });

    if (localStorage.getItem('DEF001_Selected') === null) {
      // console.log('nothing selected');
    } else {
      // console.log('selected:');
      // console.log(JSON.parse(localStorage.getItem('DEF001_Selected')));
      this.selectedDefs = JSON.parse(localStorage.getItem('DEF001_Selected'));
    }
  }

  toggleFullList() {
    this.viewFullList = !this.viewFullList;
  }

  autoSave(selected: MarDef[]) {
    // console.log(selected);
    localStorage.setItem('DEF001_Selected', JSON.stringify(selected));
  }
}
