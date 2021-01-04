import { Component, OnInit } from '@angular/core';

import { Entry } from 'contentful';

import { ContentfulService } from './../../../shared/services/contentful.service';

@Component({
  selector: 'vsoft-nx-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  contentfulItem: Entry<any>;

  constructor(private cfService: ContentfulService) {}

  ngOnInit() {
    const contentfulId = '1dT2EAqGoQfcRDcXi62YmX';
    this.cfService.getContentDetail(contentfulId).subscribe((result) => {
      this.contentfulItem = result;
      // console.log(this.contentfulItem);
    });
  }

  refresh(): void {
    localStorage.removeItem('vsoft_privacy');
    window.location.reload();
  }
}
