import { Component, OnInit } from '@angular/core';

import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Entry } from 'contentful';

import { ContentfulService } from './../../../shared/services/contentful.service';

@Component({
  selector: 'vsoft-nx-ins-fire',
  templateUrl: './ins-fire.component.html',
  styleUrls: ['./ins-fire.component.scss'],
})
export class InsFireComponent implements OnInit {
  cfFireGenerally: Entry<any>;
  cfFireHouse: Entry<any>;
  cfFireBurglary: Entry<any>;

  constructor(private cfService: ContentfulService) {}

  ngOnInit(): void {
    const fireGenerallyId = '3B54XYvvHXaXNguIqrialm';
    this.cfService.getContentDetail(fireGenerallyId).subscribe((result) => {
      this.cfFireGenerally = result;
      // console.log(this.cfFireGenerally);
    });
    const fireHouseId = '5Qb07yFK9LNMzgHEViN2c';
    this.cfService.getContentDetail(fireHouseId).subscribe((result) => {
      this.cfFireHouse = result;
      // console.log(this.cfFireHouse);
    });
    const fireBurglaryId = 'lGVr8cL91Pzs0j6q9skiC';
    this.cfService.getContentDetail(fireBurglaryId).subscribe((result) => {
      this.cfFireBurglary = result;
      // console.log(this.cfFireBurglary);
    });
  }
}
