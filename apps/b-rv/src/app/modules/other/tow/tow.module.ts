import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TowRoutingModule } from './tow-routing.module';
import { TowComponent } from './tow.component';


@NgModule({
  declarations: [TowComponent],
  imports: [
    CommonModule,
    TowRoutingModule
  ]
})
export class TowModule { }
