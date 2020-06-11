import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoundRobinAlgorithmRoutingModule } from './round-robin-algorithm-routing.module';
import { RoundRobinAlgorithmComponent } from './round-robin-algorithm.component';
import { MatButtonModule, MatTableModule, MatProgressBarModule } from '@angular/material';
import { FusionChartsModule } from 'angular-fusioncharts';


@NgModule({
  declarations: [RoundRobinAlgorithmComponent],
  imports: [
    CommonModule,
    RoundRobinAlgorithmRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule,
    FusionChartsModule
  ]
})
export class RoundRobinAlgorithmModule { }
