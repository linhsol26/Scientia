import { Component, Input } from '@angular/core';
import { CrudCoursesService } from './services/crud-courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Scientia';
  @Input() opened: boolean;

  constructor(public crudService: CrudCoursesService) {}

  changeState(event) {
    this.opened = event;
    console.log('from app');
  }
}
