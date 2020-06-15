import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SjfAlgorithmComponent } from './sjf-algorithm.component';

const routes: Routes = [{ path: '', component: SjfAlgorithmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SjfAlgorithmRoutingModule { }
