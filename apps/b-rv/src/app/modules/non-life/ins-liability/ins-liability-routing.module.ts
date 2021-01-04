import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsLiabilityComponent } from './ins-liability.component';

const routes: Routes = [{ path: '', component: InsLiabilityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsLiabilityRoutingModule { }
