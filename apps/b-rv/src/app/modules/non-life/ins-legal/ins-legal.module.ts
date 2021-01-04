import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsLegalRoutingModule } from './ins-legal-routing.module';
import { InsLegalComponent } from './ins-legal.component';


@NgModule({
  declarations: [InsLegalComponent],
  imports: [
    CommonModule,
    InsLegalRoutingModule
  ]
})
export class InsLegalModule { }
