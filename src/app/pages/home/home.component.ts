import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';
import { MatDialog } from '@angular/material';
import { CourseParamsComponent } from 'src/app/dialogs/course-params/course-params.component';
import { Courses } from 'src/app/model/courses.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router,
    public crudService: CrudCoursesService,
    public dialog: MatDialog
  ) { }

  // data: any;
  dataTestDialog: Array<Courses> = [];
  datas = this.crudService.datas;
  ngOnInit() {
  }

  getCourse(course) {
    this.router.navigate(['/course/' + course]);
    this.crudService.getIndex(course);
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CourseParamsComponent, {
      height: '400px',
      width: '600px',
      data: this.dataTestDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataTestDialog.push(result);
    });
  }
}
