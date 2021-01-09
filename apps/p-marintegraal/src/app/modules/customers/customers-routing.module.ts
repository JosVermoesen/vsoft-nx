import { Routes } from '@angular/router';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerListResolver } from './resolvers/customer-list.resolver';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerDetailResolver } from './resolvers/customer-detail.resolver';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerEditResolver } from './resolvers/customer-edit.resolver';
import { CustomerNewComponent } from './customer-new/customer-new.component';

export const routes: Routes = [
  {
    path: 'new',
    component: CustomerNewComponent
  },
  {
    path: 'list',
    component: CustomersListComponent,
    resolve: { customers: CustomerListResolver }
  },
  {
    path: ':id',
    component: CustomerDetailComponent,
    resolve: { customer: CustomerDetailResolver }
  },
  {
    path: 'edit/:id',
    component: CustomerEditComponent,
    resolve: { customer: CustomerEditResolver }
  }
];
