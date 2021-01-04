import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsAssistanceComponent } from './ins-assistance.component';

const routes: Routes = [{ path: '', component: InsAssistanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsAssistanceRoutingModule { }
