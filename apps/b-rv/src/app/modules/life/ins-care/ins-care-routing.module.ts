import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsCareComponent } from './ins-care.component';

const routes: Routes = [{ path: '', component: InsCareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsCareRoutingModule { }
