import { Component, OnInit } from '@angular/core';

import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'vsoft-nx-hosting',
  templateUrl: './hosting.component.html',
})
export class HostingComponent implements OnInit {
  accordeonOneAtATime = true;
  accordeonHostingOpen = true;

  constructor(private seoS: SeoService) {}

  ngOnInit(): void {
    this.seoS.setAll('HOSTING');
  }
}
