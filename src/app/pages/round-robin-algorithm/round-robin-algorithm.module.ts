import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoundRobinAlgorithmRoutingModule } from './round-robin-algorithm-routing.module';
import { RoundRobinAlgorithmComponent } from './round-robin-algorithm.component';
import {
  MatButtonModule,
  MatTableModule,
  MatProgressBarModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule
} from '@angular/material';
import { FusionChartsModule } from 'angular-fusioncharts';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RoundRobinAlgorithmComponent],
  imports: [
    CommonModule,
    RoundRobinAlgorithmRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule,
    FusionChartsModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class RoundRobinAlgorithmModule { }
