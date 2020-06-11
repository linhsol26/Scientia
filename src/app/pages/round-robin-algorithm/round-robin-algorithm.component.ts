import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { RoundRobinService } from 'src/app/services/round-robin.service';
import { Square } from '../../model/square.model';

@Component({
  selector: 'app-round-robin-algorithm',
  templateUrl: './round-robin-algorithm.component.html',
  styleUrls: ['./round-robin-algorithm.component.scss'],
})
export class RoundRobinAlgorithmComponent implements OnInit {

  // Table
  displayedColumns: string[] = ['Name', 'BurstTime1', 'IO', 'BurstTime2'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Array<any> = [
    {Name: 'P1', BurstTime1: 3, IO: 4, BurstTime2: 3},
    {Name: 'P2', BurstTime1: 3, IO: 2, BurstTime2: 5},
    {Name: 'P3', BurstTime1: 1, IO: 3, BurstTime2: 5},
    {Name: 'P4', BurstTime1: 5, IO: 4, BurstTime2: 1},
  ];

  // Data Algorithm
  names = [];
  inputValue: Array<any> = [
    [3, 4, 3],
    [3, 2, 5],
    [1, 3, 5],
    [5, 4, 1],
  ];
  quantum = 2;

  // Kết quả cuối cùng
  result;

  constructor(
    public al: RoundRobinService,
    ) {}

  ngOnInit(): void {
    this.names = this.data.map(value => value.Name);
  }

  getProcAndIO(result) {
    const resultProcess = [];
    const IOProcess = [];

    // Lấy tiến trình CPU của từng Process
    for (let i = 0; i < this.names.length; i++) {
      const res = [];
      for (let j = result[i][0].CPU.length - 1; j >= 0; j--) {
        if (
          result[i][0].CPU[j - 1] !== undefined &&
          result[i][0].CPU[j] !== undefined &&
          result[i][0].CPU[j + 1] !== undefined ||
          result[i][0].CPU[j - 1] !== undefined &&
          result[i][0].CPU[j] !== undefined ||
          result[i][0].CPU[j] !== undefined &&
          result[i][0].CPU[j + 1] !== undefined
          ) {

          let startTime = 0;
          const endTime = result[i][0].CPU[j].Time;

          const currentTime = result[i][0].CPU[j].Time;
          let previousTime = 0;
          let nextTime = 0;
          if (result[i][0].CPU[j + 1] !== undefined) {
            nextTime = result[i][0].CPU[j + 1].Time;
          }

          if (result[i][0].CPU[j - 1] !== undefined) {
            previousTime = result[i][0].CPU[j - 1].Time;
            startTime = result[i][0].CPU[j - 1].Time - 1;
          }

          if (endTime - startTime === this.quantum) {
            res.push({
              start: startTime,
              end: endTime
            });
          } else if (
            nextTime - currentTime >= this.quantum && j === 0 ||
            currentTime - previousTime >= this.quantum && j === result[i][0].CPU.length - 1 ||
            nextTime - currentTime >= this.quantum && currentTime - previousTime >= this.quantum
          ) {
            res.push({
              start: currentTime - 1,
              end: currentTime
            });
          }
        }
      }
      resultProcess.push(res);
    }

    // Lấy IO của từng Process
    for (let i = 0; i < this.names.length; i++) {
      const io = [];
      const startTime = result[i][0].IO[0].Time - 1;
      const endTime = result[i][0].IO[result[i][0].IO.length - 1].Time;
      io.push({
        start: startTime,
        end: endTime
      });

      IOProcess.push(io);
    }

    return {
      Process: resultProcess,
      IO: IOProcess
    };
  }

  run() {
    const result: Array<Array<any>> = this.al.runRoundRobinScheduler(this.names, this.inputValue, this.quantum);
    console.log(result);
    this.result = this.getProcAndIO(result);
    console.log(this.result);
  }
}
