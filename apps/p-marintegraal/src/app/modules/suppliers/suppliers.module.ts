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
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

import { routes } from './suppliers-routing.module';
import { SupplierService } from './services/supplier.service';
import { SupplierSetupComponent } from './supplier-setup/supplier-setup.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierListResolver } from './resolvers/supplier-list.resolver';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierDetailResolver } from './resolvers/supplier-detail.resolver';
import { SupplierNewComponent } from './supplier-new/supplier-new.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierEditResolver } from './resolvers/supplier-edit.resolver';
import { SupplierInvoicesComponent } from './supplier-invoices/supplier-invoices.component';

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
    SupplierSetupComponent,
    SuppliersListComponent,
    SupplierDetailComponent,
    SupplierNewComponent,
    SupplierEditComponent,
    SupplierInvoicesComponent
  ],
  providers: [
    SupplierService,
    SupplierListResolver,
    SupplierDetailResolver,
    SupplierEditResolver
  ]
  /* ,
  entryComponents: [
    CustomerNewComponent,
    CustomerEditComponent
  ] */
})
export class SuppliersModule {}
