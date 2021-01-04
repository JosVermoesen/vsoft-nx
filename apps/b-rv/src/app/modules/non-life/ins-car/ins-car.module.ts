import { SharedModule } from './../../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsCarRoutingModule } from './ins-car-routing.module';
import { InsCarComponent } from './ins-car.component';


@NgModule({
  declarations: [InsCarComponent],
  imports: [
    CommonModule,
    InsCarRoutingModule,
    SharedModule,
    TabsModule.forRoot(),
  ]
})
export class InsCarModule { }
