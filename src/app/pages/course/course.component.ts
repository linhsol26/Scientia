import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';
import { Chart } from 'angular-highcharts';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlgoParamsComponent } from 'src/app/dialogs/algo-params/algo-params.component';
import { AlgoParams } from 'src/app/model/algo-params.model';
import { chart } from 'highcharts';

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

  content: any;
  course: any;
  data = [];
  algoConfig: any;
  algoName: string;
  flag = false;
  chart: any;

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
      // if (!this.flag) {
        const phases = [];
        const arrive = [];
        const cpu = [];
        const io = [];
        const cpu2 = [];
        this.algoConfig = result;
        this.algoName = this.algoConfig.data[0].algoName;
        console.log(this.algoConfig);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.algoConfig.data.length; i++) {
          phases.push('P' + (i + 1));
          arrive.push(this.algoConfig.data[i].arriveTime);
          cpu.push(this.algoConfig.data[i].cpu);
          io.push(this.algoConfig.data[i].io);
          cpu2.push(this.algoConfig.data[i].cpu2);
        }
        this.flag = true;
        console.log(phases);
        console.log(arrive);

        // tslint:disable-next-line:no-shadowed-variable
        const chart = new Chart({
          chart: {
              type: 'bar',
              inverted: true
          },
          title: {
              text: this.algoName
          },
          // credits: {
          //     enabled: false
          // },
          xAxis: {
            categories: phases
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
            name: 'Arrive Time',
            data: arrive
          }]
      });
        this.chart = chart;
      // }
    });
  }
}
