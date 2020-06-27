import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SjfAlgorithmRoutingModule } from './sjf-algorithm-routing.module';
import { SjfAlgorithmComponent } from './sjf-algorithm.component';
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
   MatInputModule} from '@angular/material';
import { FusionChartsModule } from 'angular-fusioncharts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SjfAlgorithmComponent],
  imports: [
    CommonModule,
    SjfAlgorithmRoutingModule,
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
    Ng2GoogleChartsModule,
    MatInputModule
  ]
})
export class SjfAlgorithmModule { }
