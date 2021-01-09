import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

import { routes } from './customers-routing.module';
import { CustomerService } from './services/customer.service';
import { CustomerSetupComponent } from './customer-setup/customer-setup.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerListResolver } from './resolvers/customer-list.resolver';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerDetailResolver } from './resolvers/customer-detail.resolver';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerEditResolver } from './resolvers/customer-edit.resolver';
import { CustomerInvoicesComponent } from './customer-invoices/customer-invoices.component';
import { CustomerContractsComponent } from './customer-contracts/customer-contracts.component';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    ListboxModule,
    TableModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CustomerSetupComponent,
    CustomersListComponent,
    CustomerDetailComponent,
    CustomerNewComponent,
    CustomerEditComponent,
    CustomerContractsComponent,
    CustomerInvoicesComponent
  ],
  providers: [
    CustomerService,
    CustomerListResolver,
    CustomerDetailResolver,
    CustomerEditResolver
  ]
  /* ,
  entryComponents: [
    CustomerNewComponent,
    CustomerEditComponent
  ] */
})
export class CustomersModule {}
