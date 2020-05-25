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
  ngOnInit() {
    this.course = this.crudService.getContent();
  }
}
