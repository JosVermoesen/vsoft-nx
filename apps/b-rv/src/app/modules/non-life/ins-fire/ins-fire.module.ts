import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { InsFireRoutingModule } from './ins-fire-routing.module';
import { InsFireComponent } from './ins-fire.component';

import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  declarations: [InsFireComponent],
  imports: [
    CommonModule,
    InsFireRoutingModule,
    SharedModule,
    TabsModule.forRoot(),
  ]
})
export class InsFireModule { }
