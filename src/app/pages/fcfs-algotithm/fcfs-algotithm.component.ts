import { Component, OnInit } from '@angular/core';
import { Process, Queue, Task, TaskType  } from 'src/app/algorithm-core/fcfs';
import { FcfsService } from 'src/app/services/fcfs.service';
@Component({
  selector: 'app-fcfs-algotithm',
  templateUrl: './fcfs-algotithm.component.html',
  styleUrls: ['./fcfs-algotithm.component.scss']
})
export class FcfsAlgotithmComponent implements OnInit {

  resultArray: Array<any> = [
    ['Name', 'State', 'From', 'To'],
  ];
  public chart: any = {
    chartType: 'Timeline',
    dataTable: this.resultArray,
  };

  // phases = ['P1', 'P2', 'P3'];
  // arriveTime = [0, 1, 2];
  // cpu = [[3, 3], [1, 1], [2, 3]];
  // io = [[2], [2], [3]];

  phases = ['P1', 'P2', 'P3'];
  // arriveTime = [0, 0, 0];
  // cpu = [[1, 1, 1, 1, 1], [2, 2, 3], [13, 2]];
  // io = [[4, 4, 4, 4], [7, 7], [6]];
  // arriveTime = [0, 1, 2];
  // cpu = [[3, 3], [2, 2], [1, 5]];
  // io = [[4], [2], [1]];


  arriveTime = [0, 1, 2];
  cpu = [[3, 3], [1, 1], [2, 3]];
  io = [[2], [2], [3]];


  // phases: Array<string> = [];
  // arriveTime: Array<number> = [];
  // cpu: Array<Array<number>> = [];
  // io: Array<Array<number>> = [];

  procList1 = new Array<Process>();
  waitingTime: Array<number> = [];
  responseTime: Array<number> = [];
  totalTime: Array<number> = [];

  // input data
  inputFlag = false;
  buttonFlag = true;
  numOfProcess: number;
  tasks: Array<string> = ['No.', 'ArriveTime', 'CPU', 'IO', 'CPU'];
  properties = {id: 0, arrive: 0};
  inputData: Array<any> = [];
  flagChart = false;
  constructor(
    public algorithm: FcfsService
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
    this.flagChart = true;
  }

  confirmNOP() {
    if (this.buttonFlag) {
      for (let i = 0; i < this.numOfProcess; i++) {
        this.inputData.push({...this.properties});
        this.inputData[i].id = 'P' + (i + 1).toString();
      }
      this.buttonFlag = false;
    }
    console.log(this.inputData);
  }

  addTask() {
    this.tasks.push('IO', 'CPU');
  }

  minusTask() {
    if (this.tasks.length > 5) {
      this.tasks.pop();
      this.tasks.pop();
    }
  }

}
