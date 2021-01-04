import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TowComponent } from './tow.component';

const routes: Routes = [{ path: '', component: TowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TowRoutingModule { }
