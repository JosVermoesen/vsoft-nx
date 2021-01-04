import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsFireComponent } from './ins-fire.component';

const routes: Routes = [{ path: '', component: InsFireComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsFireRoutingModule { }
