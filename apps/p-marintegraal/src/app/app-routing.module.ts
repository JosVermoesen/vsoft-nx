import { PdfTesterComponent } from './_startup/pdf-tester/pdf-tester.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './_startup/welcome/welcome.component';
import { ExitComponent } from './_startup/exit/exit.component';
import { LoginComponent } from './_startup/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'exit', component: ExitComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pdftest', component: PdfTesterComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'z',
        loadChildren: () => import('./modules/z/z.module').then(m => m.ZModule)
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./modules/customers/customers.module').then(
            m => m.CustomersModule
          )
      },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./modules/suppliers/suppliers.module').then(
            m => m.SuppliersModule
          )
      },
      {
        path: 'ledgeraccounts',
        loadChildren: () =>
          import('./modules/ledgeraccounts/ledgeraccounts.module').then(
            m => m.LedgerAccountsModule
          )
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/admin/admin.module').then(m => m.AdminModule
          )
      }
    ]
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  // refresh on IIS works now, adding after routes: , { useHash: true }
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
