import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuillEditorComponent } from './global/quill-editor/quill-editor.component';
import { PrivacyComponent } from './global/footer/privacy/privacy.component';

const routes: Routes = [
  { path: 'privacy', component: PrivacyComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'ins-fire',
    loadChildren: () =>
      import('./modules/non-life/ins-fire/ins-fire.module').then(
        (m) => m.InsFireModule
      ),
  },
  {
    path: 'ins-car',
    loadChildren: () =>
      import('./modules/non-life/ins-car/ins-car.module').then(
        (m) => m.InsCarModule
      ),
  },
  {
    path: 'ins-investment',
    loadChildren: () =>
      import('./modules/life/ins-investment/ins-investment.module').then(
        (m) => m.InsInvestmentModule
      ),
  },
  {
    path: 'tow',
    loadChildren: () =>
      import('./modules/other/tow/tow.module').then((m) => m.TowModule),
  },
  { path: 'editor', component: QuillEditorComponent },

  {
    path: 'about',
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'gadgets',
    loadChildren: () =>
      import('./modules/gadgets/gadgets.module').then((m) => m.GadgetsModule),
  },
  {
    path: 'offers',
    loadChildren: () =>
      import('./modules/offers/offers.module').then((m) => m.OffersModule),
  },
  {
    path: 'steppertest',
    loadChildren: () =>
      import('./modules/steppertest/steppertest.module').then(
        (m) => m.SteppertestModule
      ),
  },
  {
    path: 'ins-legal',
    loadChildren: () =>
      import('./modules/non-life/ins-legal/ins-legal.module').then(
        (m) => m.InsLegalModule
      ),
  },

  {
    path: 'ins-assistance',
    loadChildren: () =>
      import('./modules/non-life/ins-assistance/ins-assistance.module').then(
        (m) => m.InsAssistanceModule
      ),
  },
  {
    path: 'ins-liability',
    loadChildren: () =>
      import('./modules/non-life/ins-liability/ins-liability.module').then(
        (m) => m.InsLiabilityModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'ins-care',
    loadChildren: () =>
      import('./modules/life/ins-care/ins-care.module').then(
        (m) => m.InsCareModule
      ),
  },
  { path: '**', redirectTo: 'contact', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
