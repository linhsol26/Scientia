import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrtfAlgorithmComponent } from './srtf-algorithm.component';

const routes: Routes = [{ path: '', component: SrtfAlgorithmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SrtfAlgorithmRoutingModule { }
