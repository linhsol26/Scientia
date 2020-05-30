import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CourseComponent } from 'src/app/pages/course/course.component';
import { AlgoParams } from 'src/app/model/algo-params.model';
import { Courses } from 'src/app/model/courses.model';

@Component({
  templateUrl: './algo-params.component.html',
  styleUrls: ['./algo-params.component.scss']
})
export class AlgoParamsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {algoName: string, input: AlgoParams[] }
  ) { }
  inputData: AlgoParams[] = this.data.input;
  flag = true;
  numOfProcess: number;

  tempData: AlgoParams = {algoName: this.data.algoName, arriveTime: 0, cpu: 0, io: 0, cpu2: 0};

  ngOnInit() {
    this.inputData = [];
    console.log(this.inputData);
  }
  confirmNOP() {
    if (this.flag) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.numOfProcess; i++) {
        this.inputData.push(this.tempData);
      }
      this.flag = false;
    }
    console.log(this.inputData);
  }

  add() {
    this.inputData.push(this.tempData);
    console.log(this.inputData);
  }

  minus() {
    this.inputData.pop();
    console.log(this.inputData);
  }

  save() {
    this.dialogRef.close({
      numOfProcess: this.inputData.length,
      data: this.inputData
    });
    console.log(this.inputData);
  }

  cancel() {
    this.dialogRef.close();
  }
}
