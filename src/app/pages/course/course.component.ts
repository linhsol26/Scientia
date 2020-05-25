import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(
    public activatedRouter: ActivatedRoute,
    public crudService: CrudCoursesService
  ) { }

  course: any;
  data = [];
  ngOnInit() {
    this.course = this.crudService.getContent();
    console.log(this.course.length);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.course.length; i++) {
      this.data.push(this.course[i]);
    }
    console.log(this.data);
  }
}
