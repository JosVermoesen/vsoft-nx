import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsInvestmentComponent } from './ins-investment.component';

const routes: Routes = [{ path: '', component: InsInvestmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsInvestmentRoutingModule { }
