import { Routes } from '@angular/router';

import { LedgerAccountsListComponent } from './ledgeraccounts-list/ledgeraccounts-list.component';
import { LedgerAccountListResolver } from './resolvers/ledgeraccount-list.resolver';
import { LedgerAccountDetailComponent } from './ledgeraccount-detail/ledgeraccount-detail.component';
import { LedgerAccountDetailResolver } from './resolvers/ledgeraccount-detail.resolver';
import { LedgerAccountEditComponent } from './ledgeraccount-edit/ledgeraccount-edit.component';
import { LedgerAccountEditResolver } from './resolvers/ledgeraccount-edit.resolver';
import { LedgerAccountNewComponent } from './ledgeraccount-new/ledgeraccount-new.component';

export const routes: Routes = [
  {
    path: 'new',
    component: LedgerAccountNewComponent
  },
  {
    path: 'list',
    component: LedgerAccountsListComponent,
    resolve: { accounts: LedgerAccountListResolver }
  },
  {
    path: ':id',
    component: LedgerAccountDetailComponent,
    resolve: { account: LedgerAccountDetailResolver }
  },
  {
    path: 'edit/:id',
    component: LedgerAccountEditComponent,
    resolve: { account: LedgerAccountEditResolver }
  }
];
