import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { CourseParamsComponent } from 'src/app/dialogs/course-params/course-params.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from 'src/app/dialogs/confirm-delete/confirm-delete.component';
import { UpdateCourseComponent } from 'src/app/dialogs/update-course/update-course.component';


@NgModule({
  declarations: [HomeComponent, CourseParamsComponent, UpdateCourseComponent],
  entryComponents: [CourseParamsComponent, UpdateCourseComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ]
})
export class HomeModule { }
