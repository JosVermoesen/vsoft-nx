import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SteppertestComponent } from './steppertest.component';

const routes: Routes = [{ path: '', component: SteppertestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SteppertestRoutingModule { }
