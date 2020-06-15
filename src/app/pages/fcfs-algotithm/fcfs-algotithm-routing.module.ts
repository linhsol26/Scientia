import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FcfsAlgotithmComponent } from './fcfs-algotithm.component';

const routes: Routes = [{ path: '', component: FcfsAlgotithmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FcfsAlgotithmRoutingModule { }
