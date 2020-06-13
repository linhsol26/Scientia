import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrtfAlgorithmComponent } from './srtf-algorithm.component';
import { SrtfService } from 'src/app/services/srtf.service';

const routes: Routes = [{ path: '', component: SrtfAlgorithmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SrtfService]
})
export class SrtfAlgorithmRoutingModule { }
