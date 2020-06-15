import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FcfsAlgotithmRoutingModule } from './fcfs-algotithm-routing.module';
import { FcfsAlgotithmComponent } from './fcfs-algotithm.component';

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
  declarations: [FcfsAlgotithmComponent],
  imports: [
    CommonModule,
    FcfsAlgotithmRoutingModule,
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
export class FcfsAlgotithmModule { }
