import { Component, OnInit } from '@angular/core';
import { Process, Queue, Task, TaskType } from 'src/app/algorithm-core/srtf';
import { SrtfService } from 'src/app/services/srtf.service';


@Component({
  selector: 'app-srtf-algorithm',
  templateUrl: './srtf-algorithm.component.html',
  styleUrls: ['./srtf-algorithm.component.scss']
})
export class SrtfAlgorithmComponent implements OnInit {

  resultArray: Array<any> = [
    ['Name', 'State', 'From', 'To'],
  ];
  public chart: any = {
    chartType: 'Timeline',
    dataTable: this.resultArray
  };
  flag = false;
  phases = ['P1', 'P2', 'P3'];
  arriveTime = [0, 1, 2];
  cpu = [[3, 3], [1, 1], [2, 3]];
  io = [[2], [2], [3]];

  procList1 = new Array<Process>();
  waitingTime: Array<number> = [];
  responseTime: Array<number> = [];
  totalTime: Array<number> = [];

  constructor(
    public algorithm: SrtfService
  ) {}

  ngOnInit() {
  }

  initProcess() {
    for (let i = 0; i < this.arriveTime.length; i++) {
      const tempTask = new Queue<Task>();
      for (let j = 0; j < this.cpu[i].length; j++) {
          tempTask.enQueue(new Task(TaskType.CPU, this.cpu[i][j]));
          tempTask.enQueue(new Task(TaskType.IO, this.io[i][j] !== undefined ? this.io[i][j] : 0));
      }
      // waiting time thứ i là một Process
      this.waitingTime.push(0);
      this.responseTime.push(0);
      this.totalTime.push(0);
      this.procList1.push(new Process(this.phases[i], this.arriveTime[i], tempTask));
    }
    return this.procList1;
  }

  run() {
    this.initProcess();
    const tempArray = this.algorithm.runAlgo(this.procList1, this.phases);
    tempArray.forEach(i => {
      this.resultArray.push(i);
    });
    console.log(this.resultArray);
    this.flag = true;
  }
}
