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
import { MatSelectModule, MatInputModule } from '@angular/material';
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
    MatInputModule
  ]
})
export class CourseModule { }
