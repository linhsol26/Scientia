import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';
import { CourseParamsComponent } from 'src/app/dialogs/course-params/course-params.component';


@NgModule({
  declarations: [HomeComponent, CourseParamsComponent],
  entryComponents: [CourseParamsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class HomeModule { }
