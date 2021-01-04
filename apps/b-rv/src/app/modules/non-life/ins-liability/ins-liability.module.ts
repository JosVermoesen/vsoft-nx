import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsLiabilityRoutingModule } from './ins-liability-routing.module';
import { InsLiabilityComponent } from './ins-liability.component';


@NgModule({
  declarations: [InsLiabilityComponent],
  imports: [
    CommonModule,
    InsLiabilityRoutingModule
  ]
})
export class InsLiabilityModule { }
