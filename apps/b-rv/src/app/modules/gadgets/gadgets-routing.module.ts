import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GadgetsComponent } from './gadgets.component';

const routes: Routes = [{ path: '', component: GadgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GadgetsRoutingModule {}
