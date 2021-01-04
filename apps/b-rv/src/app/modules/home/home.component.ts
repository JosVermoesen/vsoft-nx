import { Component, OnInit } from '@angular/core';

import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { faFire, faCar, faCalculator } from '@fortawesome/free-solid-svg-icons';

import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'vsoft-nx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 3000, noPause: true, showIndicators: true },
    },
  ],
})
export class HomeComponent implements OnInit {
  faFire = faFire;
  faCar = faCar;
  faCalculator = faCalculator;

  constructor(private seoS: SeoService) {}

  ngOnInit(): void {
    this.seoS.setAll('HOME');
  }
}
