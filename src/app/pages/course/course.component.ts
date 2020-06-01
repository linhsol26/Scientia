import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';
import { Chart } from 'angular-highcharts';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlgoParamsComponent } from 'src/app/dialogs/algo-params/algo-params.component';
import { AlgoParams } from 'src/app/model/algo-params.model';

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

  phases = [];
  arrive = [];
  content: any;
  course: any;
  data = [];
  algoConfig: any;
  flag = false;

  chart = new Chart({
    chart: {
        type: 'bar',
        inverted: true
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
        text: 'Total fruit consumption'
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
      name: 'Jane',
      data: this.arrive
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
      width: '600px',
      height: '400px',
      data: {
        algoName: algorithmName,
        input: [] as AlgoParams[]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.algoConfig = result;
      console.log('Closed');
      console.log(this.algoConfig);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.algoConfig.data.length; i++) {
        this.phases.push('P' + (i + 1));
        this.arrive.push(this.algoConfig.data[i].arriveTime);
      }
      this.flag = true;
      console.log(this.phases);
      console.log(this.arrive);
    });
  }
}
