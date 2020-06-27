import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Courses } from 'src/app/model/courses.model';

@Component({
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {
  course = new Courses();
  constructor(
    public dialogRef: MatDialogRef<UpdateCourseComponent>,
  ) { }

  ngOnInit(): void {
  }

}
