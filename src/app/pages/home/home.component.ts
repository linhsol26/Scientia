import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CourseParamsComponent } from 'src/app/dialogs/course-params/course-params.component';
import { Courses } from 'src/app/model/courses.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { result } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router,
    public crudService: CrudCoursesService,
    public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    public snackBar: MatSnackBar
  ) { }

  // data: any;
  dataTestDialog: Courses;
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
    });

    dialogRef.afterClosed().subscribe(res => {
      this.crudService.createCourse(res);
    });
  }

  async deleteCourse(data: Courses) {
    await this.crudService.deleteCourse(data);
    location.href = 'home';
  }

  async updateCourse(data: Courses) {
    await this.crudService.updateCourse(data);
    location.href = 'home';
  }
}
