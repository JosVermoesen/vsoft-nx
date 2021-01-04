import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsCarComponent } from './ins-car.component';

const routes: Routes = [{ path: '', component: InsCarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsCarRoutingModule { }
