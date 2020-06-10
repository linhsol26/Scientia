import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoundRobinAlgorithmComponent } from './round-robin-algorithm.component';
import { RoundRobinService } from 'src/app/services/round-robin.service';

const routes: Routes = [{ path: '', component: RoundRobinAlgorithmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoundRobinService]
})
export class RoundRobinAlgorithmRoutingModule { }
