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
  // cpu = [[3, 3], [1, 1], [2, 3]];
  // io = [[2], [2], [3]];

  phases = ['P1', 'P2', 'P3'];
  arriveTime = [0, 0, 0];
  cpu = [[1, 1, 1, 1, 1], [2, 2, 3], [13, 2]];
  io = [[4, 4, 4, 4], [7, 7], [6]];
  // arriveTime = [0, 1, 2];
  // cpu = [[3, 3], [2, 2], [1, 5]];
  // io = [[4], [2], [1]];

  // phases: Array<string> = [];
  // arriveTime: Array<number> = [];
  // cpu: Array<Array<number>> = [];
  // io: Array<Array<number>> = [];

  waitingTime: Array<number> = [];
  responseTime: Array<number> = [];
  totalTime: Array<number> = [];

  // input data
  inputFlag = false;
  buttonFlag = true;
  numOfProcess: number;
  flagChart = false;
  constructor(
    public algorithm: SrtfService
  ) {}

  ngOnInit() {
  }

  run() {
    let procList = new Array<Process>();
    procList = this.algorithm.initProcess(this.phases, this.arriveTime, this.cpu, this.io);
    const tempArray = this.algorithm.runAlgo(procList, this.phases);
    tempArray.forEach(i => {
      this.resultArray.push(i);
    });
    this.flagChart = true;
  }

  confirmNOP() {
    if (this.buttonFlag) {
      for (let i = 0; i < this.numOfProcess; i++) {
        this.phases[i] = 'P' + (i + 1).toString();
        this.cpu.push([]);
        this.io.push([]);
      }
      this.buttonFlag = false;
    }
  }
  // add process
  add() {
    this.phases.push('P' + (this.phases.length + 1).toString());
    this.cpu.push([]);
    this.io.push([]);
  }

  // minus process
  minus() {
    this.phases.pop();
    this.cpu.pop();
    this.io.pop();
  }

  save() {
    console.log(this.phases);
    console.log(this.arriveTime);
    console.log(this.transFormData(this.cpu[0]));
    console.log(this.io);
  }

  transFormData(value: any) {
    const result = value.split`,`.map(x => +x);
    return result;
  }
}
