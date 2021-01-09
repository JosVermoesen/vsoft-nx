import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TabViewModule } from 'primeng/tabview';
import { MailManagementComponent } from './mail-management/mail-management.component';
import { CustomerService } from '../customers/services/customer.service';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TabViewModule,
    PanelModule,
    TableModule,
    ButtonModule
  ],
  declarations: [
    AdminComponent,
    MailManagementComponent
  ],
  providers: [
    CustomerService
  ]
})
export class AdminModule { }
