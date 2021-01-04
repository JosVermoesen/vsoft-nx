import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyComponent } from './global/footer/privacy/privacy.component';

const routes: Routes = [
  { path: 'privacy', component: PrivacyComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'hosting',
    loadChildren: () =>
      import('./modules/hosting/hosting.module').then((m) => m.HostingModule),
  },
  {
    path: 'marintegraal',
    loadChildren: () =>
      import('./modules/marintegraal/marintegraal.module').then(
        (m) => m.MarintegraalModule
      ),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
