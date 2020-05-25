import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router,
    public crudService: CrudCoursesService
  ) { }
  // data: any;
  datas = this.crudService.datas;
  ngOnInit() {
  }

  getCourse(course) {
    this.router.navigate(['/course/' + course]);
    console.log(this.datas);
  }
}
