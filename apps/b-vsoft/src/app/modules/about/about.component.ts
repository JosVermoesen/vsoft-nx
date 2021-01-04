import { Component, OnInit } from '@angular/core';

import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'vsoft-nx-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  constructor(private seoS: SeoService) {}

  ngOnInit(): void {
    this.seoS.setAll('ABOUT');
  }
}
