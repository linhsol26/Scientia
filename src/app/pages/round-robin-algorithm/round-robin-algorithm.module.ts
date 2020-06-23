import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoundRobinAlgorithmRoutingModule } from './round-robin-algorithm-routing.module';
import { RoundRobinAlgorithmComponent } from './round-robin-algorithm.component';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';
import {
  MatButtonModule,
  MatTableModule,
  MatProgressBarModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatInputModule
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
    MatIconModule,
    MatInputModule,
    Ng2GoogleChartsModule
  ]
})
export class RoundRobinAlgorithmModule { }
