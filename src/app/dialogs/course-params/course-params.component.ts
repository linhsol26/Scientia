import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Courses } from 'src/app/model/courses.model';

@Component({
  templateUrl: './course-params.component.html',
  styleUrls: ['./course-params.component.scss']
})
export class CourseParamsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CourseParamsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Courses
  ) { }

  ngOnInit(): void {
  }

}
