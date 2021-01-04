import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsAssistanceRoutingModule } from './ins-assistance-routing.module';
import { InsAssistanceComponent } from './ins-assistance.component';


@NgModule({
  declarations: [InsAssistanceComponent],
  imports: [
    CommonModule,
    InsAssistanceRoutingModule
  ]
})
export class InsAssistanceModule { }
