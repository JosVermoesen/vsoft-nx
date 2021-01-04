import { Component, OnInit } from '@angular/core';

import { Entry } from 'contentful';

import { ContentfulService } from './../../shared/services/contentful.service';
import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'vsoft-nx-marintegraal',
  templateUrl: './marintegraal.component.html',
})
export class MarintegraalComponent implements OnInit {
  accordeonUpdateOpen = true;
  accordeonOneAtATime = true;

  contentfulUpdatesEntry: Entry<any>;
  contentfulContractTypesEntry: Entry<any>;

  constructor(private seoS: SeoService, private cfService: ContentfulService) {}

  ngOnInit(): void {
    this.seoS.setAll('MARINTEGRAAL');

    const contentfulUpdateId = '64Wa2kez6Yo9OqgdAAxq8s';
    this.cfService.getContentDetail(contentfulUpdateId).subscribe((result) => {
      this.contentfulUpdatesEntry = result;
    });
    const contentfulContractTypesId = '1eD6PrHZAV7K843r9KUvXN';
    this.cfService
      .getContentDetail(contentfulContractTypesId)
      .subscribe((result) => {
        this.contentfulContractTypesEntry = result;
      });
    // 1eD6PrHZAV7K843r9KUvXN
  }
}
