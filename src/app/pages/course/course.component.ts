import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';
import { Chart } from 'angular-highcharts';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlgoParamsComponent } from 'src/app/dialogs/algo-params/algo-params.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(
    public activatedRouter: ActivatedRoute,
    public crudService: CrudCoursesService,
    public dialog: MatDialog
  ) { }

  phases = ['P1', 'P2', 'P3', 'P4', 'P5'];
  content: any;
  course: any;
  data = [];

  chart = new Chart({
    chart: {
        type: 'bar'
    },
    title: {
        text: 'TITLE'
    },
    // credits: {
    //     enabled: false
    // },
    xAxis: {
      categories: this.phases
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Implements'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
        type: 'bar',
        name: 'P1',
        data: [1, 0, 4, 6, 11] // chi so
    }, {
        type: 'bar',
        name: 'P2', // ten o duoi
        data: [5, 7, 3, 2, 9]
    }]
});

  ngOnInit() {
    this.course = this.crudService.index;
    this.content = this.crudService.getContent();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.content.length; i++) {
      this.data.push(this.content[i]);
    }
    console.log(this.data);
  }

  openDialog(algorithmName) {
    console.log('opened');
    const dialogRef = this.dialog.open(AlgoParamsComponent, {
      width: '1000px',
      height: '400px',
      data: {
        algoName: algorithmName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Closed');
    });
  }
}
