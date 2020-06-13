import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AngularSplitModule } from 'angular-split';
import { ChartModule } from 'angular-highcharts';
import { AlgoParamsComponent } from 'src/app/dialogs/algo-params/algo-params.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule, MatInputModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RoundRobinAlgorithmModule } from '../round-robin-algorithm/round-robin-algorithm.module';
import { SrtfAlgorithmModule } from '../srtf-algorithm/srtf-algorithm.module';
@NgModule({
  declarations: [CourseComponent, AlgoParamsComponent],
  entryComponents: [AlgoParamsComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MatCardModule,
    MatButtonModule,
    AngularSplitModule,
    ChartModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    RoundRobinAlgorithmModule,
    SrtfAlgorithmModule
  ]
})
export class CourseModule { }
