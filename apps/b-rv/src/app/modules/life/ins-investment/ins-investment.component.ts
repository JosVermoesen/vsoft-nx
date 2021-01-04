import { Component, OnInit } from '@angular/core';

import { Entry } from 'contentful';

import { ContentfulService } from './../../../shared/services/contentful.service';

@Component({
  selector: 'vsoft-nx-ins-investment',
  templateUrl: './ins-investment.component.html',
  styleUrls: ['./ins-investment.component.scss'],
})
export class InsInvestmentComponent implements OnInit {
  catalogUrl =
    'http://www.makelaarinverzekeringen.be/ibpview/Pagina%20LevensverzekeringBelegging%20NL?ibp=true';

  contentfulItem: Entry<any>;

  constructor(private cfService: ContentfulService) {}

  ngOnInit(): void {
    const contentfulId = '3bmEeygHbxja5OGvUwxQfG';
    this.cfService.getContentDetail(contentfulId).subscribe((result) => {
      this.contentfulItem = result;
      // console.log(this.contentfulItem);
    });
  }
}
