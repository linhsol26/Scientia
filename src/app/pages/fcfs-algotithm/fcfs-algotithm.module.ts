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
   MatIconModule,
   MatInputModule} from '@angular/material';
import { FusionChartsModule } from 'angular-fusioncharts';
import { FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

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
    MatIconModule,
    Ng2GoogleChartsModule,
    MatInputModule
  ]
})
export class FcfsAlgotithmModule { }
