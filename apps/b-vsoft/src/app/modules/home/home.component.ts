import { Component, OnInit } from '@angular/core';

import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';

import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'vsoft-nx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 2000, noPause: true, showIndicators: true },
    },
  ],
})
export class HomeComponent implements OnInit {
  faAccounting = faBook;
  faHosting = faCloud;
  faApps = faMobile;

  constructor(private seoS: SeoService) {}

  ngOnInit(): void {
    this.seoS.setAll('HOME');
  }
}
