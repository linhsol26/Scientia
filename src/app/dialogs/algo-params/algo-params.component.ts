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
    @Inject(MAT_DIALOG_DATA) public data: AlgoParams
  ) { }
  inputData = [];
  flag = true;
  numOfProcess = '0';

  ngOnInit() {
    console.log(this.numOfProcess);
  }

  confirmNOP() {
    console.log(this.numOfProcess);
    if (this.flag) {
      // tslint:disable-next-line:radix
      const n = parseInt(this.numOfProcess);
      for (let i = 0; i < n; i++) {
        this.inputData.push(this.data);
      }
      this.flag = false;
    }
    console.log(this.data);
    console.log(this.inputData);
  }

  add() {
    this.inputData.push(this.data);
    console.log(this.inputData);
  }

  minus() {
    this.inputData.pop();
    console.log(this.inputData);
  }

  save() {
    // for (let i = 0; i < inputData.length; i++) {
    //   this.inputData[i].process = inputData.length;
    //   this.inputData[i].arriveTime = this.arriveTime;
      // this.inputData[i]
      // this.inputData[i]
      // this.inputData[i]
    // }
  }

  cancel() {
    this.dialogRef.close();
  }
}
