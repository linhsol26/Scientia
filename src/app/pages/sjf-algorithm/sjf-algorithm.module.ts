import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SjfAlgorithmRoutingModule } from './sjf-algorithm-routing.module';
import { SjfAlgorithmComponent } from './sjf-algorithm.component';

import {
  MatButtonModule,
   MatTableModule,
   MatProgressBarModule,
   MatCardModule,
   MatGridListModule,
   MatFormFieldModule,
   MatSelectModule,
   MatIconModule } from '@angular/material';
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
    MatIconModule
  ]
})
export class SjfAlgorithmModule { }
