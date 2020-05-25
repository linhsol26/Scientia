import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';
import { ResizeEvent } from 'angular-resizable-element';

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

  public style: object = {};
  ngOnInit() {
    this.course = this.crudService.getContent();
    console.log(this.course.length);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.course.length; i++) {
      this.data.push(this.course[i]);
    }
    console.log(this.data);
  }

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX = 50;
    if (
      event.rectangle.width &&
      // event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX)
        // event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }

}
