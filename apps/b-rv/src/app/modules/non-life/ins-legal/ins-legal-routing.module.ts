import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsLegalComponent } from './ins-legal.component';

const routes: Routes = [{ path: '', component: InsLegalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsLegalRoutingModule { }
