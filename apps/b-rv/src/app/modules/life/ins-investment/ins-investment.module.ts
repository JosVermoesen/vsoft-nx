import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsInvestmentRoutingModule } from './ins-investment-routing.module';
import { InsInvestmentComponent } from './ins-investment.component';

import { SharedModule } from '../../../shared/shared.module';
import { ContentfulService } from './../../../shared/services/contentful.service';

@NgModule({
  declarations: [InsInvestmentComponent],
  imports: [
    CommonModule,
    SharedModule,
    InsInvestmentRoutingModule
  ],
  providers: [ContentfulService]
})
export class InsInvestmentModule { }
