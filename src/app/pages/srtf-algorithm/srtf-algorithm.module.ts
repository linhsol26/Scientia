import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SrtfAlgorithmRoutingModule } from './srtf-algorithm-routing.module';
import { SrtfAlgorithmComponent } from './srtf-algorithm.component';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatTableModule, MatProgressBarModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatSelectModule, MatIconModule } from '@angular/material';
import { FusionChartsModule } from 'angular-fusioncharts';
import { FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';


@NgModule({
  declarations: [SrtfAlgorithmComponent],
  imports: [
    CommonModule,
    SrtfAlgorithmRoutingModule,
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
    Ng2GoogleChartsModule
  ]
})
export class SrtfAlgorithmModule { }
