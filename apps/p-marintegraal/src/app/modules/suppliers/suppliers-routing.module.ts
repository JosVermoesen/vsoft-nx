import { Routes } from '@angular/router';

import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierListResolver } from './resolvers/supplier-list.resolver';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierDetailResolver } from './resolvers/supplier-detail.resolver';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierEditResolver } from './resolvers/supplier-edit.resolver';
import { SupplierNewComponent } from './supplier-new/supplier-new.component';

export const routes: Routes = [
  {
    path: 'new',
    component: SupplierNewComponent
  },
  {
    path: 'list',
    component: SuppliersListComponent,
    resolve: { suppliers: SupplierListResolver }
  },
  {
    path: ':id',
    component: SupplierDetailComponent,
    resolve: { supplier: SupplierDetailResolver }
  },
  {
    path: 'edit/:id',
    component: SupplierEditComponent,
    resolve: { supplier: SupplierEditResolver }
  }
];
