import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarintegraalComponent } from './marintegraal.component';

const routes: Routes = [{ path: '', component: MarintegraalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarintegraalRoutingModule {}
