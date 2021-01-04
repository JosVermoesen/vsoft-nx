import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsCareRoutingModule } from './ins-care-routing.module';
import { InsCareComponent } from './ins-care.component';


@NgModule({
  declarations: [InsCareComponent],
  imports: [
    CommonModule,
    InsCareRoutingModule
  ]
})
export class InsCareModule { }
