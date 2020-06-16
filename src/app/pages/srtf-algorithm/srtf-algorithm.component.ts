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
    dataTable: this.resultArray,
  };

  // phases = ['P1', 'P2', 'P3'];
  // arriveTime = [0, 1, 2];
  // cpu = [[3, 3], [2, 2], [1, 5]];
  // io = [[4], [2], [1]];

  phases: Array<string> = [];
  arriveTime: Array<number> = [];
  cpu: Array<Array<number>> = [];
  io: Array<Array<number>> = [];

  procList1 = new Array<Process>();
  waitingTime: Array<number> = [];
  responseTime: Array<number> = [];
  totalTime: Array<number> = [];

  // input data
  inputFlag = false;
  buttonFlag = true;
  numOfProcess: number;
  tasks: Array<string> = ['No.', 'ArriveTime', 'CPU', 'IO'];
  numOfCpuAndIo = 3;
  inputData: Array<any> = [];
  flagChart = false;
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
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.numOfProcess; i++) {
        this.inputData.push({
          arriveTime: 0,
          cpu: [0],
          io: [0]
        });
      }
      console.log(this.inputData);
      this.buttonFlag = false;
    }
  }
  // add process
  add() {
    // this.inputData.push({...this.tempData});
    console.log(this.inputData);
  }

  // minus process
  minus() {
    this.inputData.pop();
    console.log(this.inputData);
  }

  save() {
    for (let i = 0; i < this.inputData.length; i++) {
      this.phases.push('P' + (i + 1));
      this.arriveTime.push(this.inputData[i].arriveTime);
      this.cpu[i].push(this.inputData[i].cpu);
      this.io[i].push(this.inputData[i].io);
    }
    console.log(this.cpu);
    console.log(this.io);
    this.inputFlag = true;
    // this.inputArray = this.initProcess();
  }

  addTask() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[this.tasks.length - 1] === 'CPU') {
        this.inputData[i].io.push(0);
      } else {
        this.inputData[i].cpu.push(0);
      }
    }
    console.log(this.inputData);
  }
}
