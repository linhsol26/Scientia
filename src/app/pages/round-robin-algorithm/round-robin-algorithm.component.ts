import { Component, OnInit, NgZone } from '@angular/core';
import { RoundRobinService } from 'src/app/services/round-robin.service';
import { DataSource, Result, RESPONSE, CPU, WAITING, IO, TERMINATED } from 'src/app/algorithm-core/chart';

import * as lodash from 'lodash';

const dataSource: DataSource = {
  chart: {
    caption: 'Machine Operating Schedule For Round Robin Algorithm',
    subcaption: 'Times',
    theme: 'fusion',
    dateformat: 'dd/mm/yyyy',
    plottooltext: 'Status for period <b>$start - $end</b> is <b>$label</b>',
    processHoverBandColor: '#BEFFFF',
    processHoverBandAlpha: '40'
  },
  legend: {
    item: [
      {
        label: 'Arrived',
        color: '#FFFFFF',
      },
      {
        label: 'Response',
        color: '#CCCCCC',
      },
      {
        label: 'CPU',
        color: '#62B58D',
      },
      {
        label: 'IO',
        color: '#F2726F',
      },
      {
        label: 'Waiting',
        color: '#FFFFCC',
      },
      {
        label: 'Terminated',
        color: '#000000',
      },
    ],
  },
  tasks: {
    task: [],
  },
  processes: {
    isbold: '1',
    headertext: 'Process',
    process: [],
  },
  categories: [
    {
      bgalpha: '0',
      category: [],
    },
  ],
};

@Component({
  selector: 'app-round-robin-algorithm',
  templateUrl: './round-robin-algorithm.component.html',
  styleUrls: ['./round-robin-algorithm.component.scss'],
})
export class RoundRobinAlgorithmComponent implements OnInit {

  // Lodash library
  _: any = lodash;

  // tslint:disable-next-line: ban-types
  dataSource: Object;
  inputFlag = false;
  buttonFlag = true;
  numOfProcess: number;
  inputData: Array<any> = [];
  tempData = {
    Name: '',
    ArriveTime: 0,
    BurstTime1: 0,
    IO: 0,
    BurstTime2: 0
  };

  // Table
  displayedColumns: string[] = ['Name', 'ArriveTime', 'BurstTime1', 'IO', 'BurstTime2'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Array<any> = [];

  // Data Algorithm
  arriveTime = [];
  names = [];
  inputValue: Array<any> = [];
  quantum = 2;

  result;

  // Chart variable
  chartFlag = false;
  responseTimeResult = [];
  waitingTimeResult = [];
  totalTimeResult = [];
  ioTimeResult = [];

  // Check
  isTotalEqual = [];

  constructor(public al: RoundRobinService) {
    this.dataSource = dataSource;
  }

  ngOnInit(): void {
    this.initClock();
  }

  confirmNOP() {
    if (this.buttonFlag) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.numOfProcess; i++) {
        this.inputData.push({...this.tempData});
      }
      this.buttonFlag = false;
    }
  }

  add() {
    this.inputData.push({...this.tempData});
  }

  minus() {
    this.inputData.pop();
  }

  save() {
    this.data = this.inputData;
    this.getNamesAndArriveTime();
    this.inputFlag = true;
  }

  initClock() {
    for (let i = 0; i <= 30; i++) {
      // tslint:disable-next-line: no-string-literal
      dataSource.categories[0]['category'].push({
        start: `${i}/6/2020`,
        end: `${i + 1}/6/2020`,
        label: `${i}`,
      });
    }
  }

  getNamesAndArriveTime() {
    this.names = this.data.map((value) => {
      const process = [];
      process.push(value.BurstTime1);
      process.push(value.IO);
      process.push(value.BurstTime2);

      this.arriveTime.push(value.ArriveTime);
      this.inputValue.push(process);

      this.responseTimeResult.push(0);
      this.waitingTimeResult.push(0);
      this.totalTimeResult.push(0);
      this.isTotalEqual.push(0);

      return value.Name;
    });
  }

  getProcAndIO(result) {
    const resultProcess = [];
    const IOProcess = [];

    // Lấy tiến trình CPU của từng Process
    for (let i = 0; i < this.names.length; i++) {
      const res = [];
      for (let j = result[i][0].CPU.length - 1; j >= 0; j--) {
        if (
          (result[i][0].CPU[j - 1] !== undefined &&
            result[i][0].CPU[j] !== undefined &&
            result[i][0].CPU[j + 1] !== undefined) ||
          (result[i][0].CPU[j - 1] !== undefined &&
            result[i][0].CPU[j] !== undefined) ||
          (result[i][0].CPU[j] !== undefined &&
            result[i][0].CPU[j + 1] !== undefined)
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
              end: endTime,
            });
          } else if (
            (nextTime - currentTime >= this.quantum && j === 0) ||
            (currentTime - previousTime >= this.quantum &&
              j === result[i][0].CPU.length - 1) ||
            (nextTime - currentTime >= this.quantum &&
              currentTime - previousTime >= this.quantum)
          ) {
            res.push({
              start: currentTime - 1,
              end: currentTime,
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
        end: endTime,
      });

      IOProcess.push(io);
    }

    return {
      Process: resultProcess,
      IO: IOProcess,
    };
  }

  setValueToGanttChart(
    names: string[],
    arriveTime: number[],
    result: Result,
    responseTimeResult: Array<any>,
    waitingTimeResult: Array<any>,
    ioTimeResult: Array<any>,
    totalTimeResult: Array<any>
  ) {

    const waitingArray: object = {};

    for (const [index, value] of names.entries()) {

      // Khởi tạo chart các process
      dataSource.processes.process.push({
        label: value,
        id: value
      });

      // Vẽ Response Time
      const calResponse = result.Process[index][result.Process[index].length - 1];
      if (calResponse.start === arriveTime[index]) {

        dataSource.tasks.task.push({
          label: RESPONSE.label,
          processid: value,
          start: `${arriveTime[index] + 1}/6/2020`,
          end: `${arriveTime[index] + 1}/6/2020`,
          bordercolor: RESPONSE.bordercolor,
          color: RESPONSE.color
        });

        // Tính Response Time
        responseTimeResult[index] += arriveTime[index];
      } else {

        dataSource.tasks.task.push({
          label: RESPONSE.label,
          processid: value,
          start: `${arriveTime[index] + 1}/6/2020`,
          end: `${calResponse.start + 1}/6/2020`,
          bordercolor: RESPONSE.bordercolor,
          color: RESPONSE.color
        });

        // Tính Response Time
        responseTimeResult[index] += calResponse.start - arriveTime[index];
      }

      for (const val of result.Process[index]) {

        let previousTime: {start, end} = null;
        if (result.Process[index][result.Process[index].indexOf(val) + 1]) {
          previousTime = result.Process[index][result.Process[index].indexOf(val) + 1];
        }

        // Fix time có thể sai or lỗi
        if (previousTime && val.start >= previousTime.end) {
          continue;
        } else if (previousTime && val.start < previousTime.end) {
          while (val.start < previousTime.end) {
            for (let i = result.Process[index].length - 1; i >= 0; i--) {

              const start = result.Process[index][i - 1];
              if (start && start.start < result.Process[index][i].end && result.Process[index][i - 1]) {
                result.Process[index][i - 1].start = start.start + 1;
                result.Process[index][i - 1].end = start.end + 1;
              }
            }
          }
        } else if (result.IO[index].start < val.start < result.IO[index].end) {

          while (val.start >= result.IO[index].end) {
            if (result.Process[index][result.Process[index].indexOf(val)]) {
              result.Process[index][result.Process[index].indexOf(val)].start =
              result.Process[index][result.Process[index].indexOf(val)].start + 1;
              result.Process[index][result.Process[index].indexOf(val)].end =
              result.Process[index][result.Process[index].indexOf(val)].end + 1;
            }
          }
        }
      }

      for (const val of result.Process[index]) {

        if (waitingArray[value] === undefined) {
          waitingArray[value] = [];
        }

        const waitingStart = result.Process[index][result.Process[index].indexOf(val) + 1];
        if (waitingStart && waitingStart.end <= val.start) {
          waitingArray[value].push({
            start: waitingStart.end,
            end: val.start
          });
        }
      }

      // Vẽ IO Process
      for (const val of result.IO[index]) {
        dataSource.tasks.task.push({
          label: IO.label,
          processid: value,
          start: `${val.start + 1}/6/2020`,
          end: `${val.end + 1}/6/2020`,
          bordercolor: IO.bordercolor,
          color: IO.color
        });
      }

      ioTimeResult[index] = result.IO[index][0].end - result.IO[index][0].start;

      // Check Waiting trùng IO, Waiting Time bị lệch
      for (const val of waitingArray[value]) {
        const i = waitingArray[value].indexOf(val);

        if (val.start === result.IO[index][0].start) {
          waitingArray[value][i].start += result.IO[index][0].end - result.IO[index][0].start;
        }

        if (val.start > val.end) {
          const decrementCount = val.start - val.end;
          console.log(decrementCount);

          lodash.pullAllWith(waitingArray[value], [{
            start: val.start,
            end: val.end
          }], lodash.isEqual);

          // Fix lại CPU Time
          for (const v of result.Process[index]) {

            const j = result.Process[index].indexOf(v);

            if (j <= i) {
              result.Process[index][j].start = result.Process[index][j].start - decrementCount;

              result.Process[index][j].end = result.Process[index][j].end - decrementCount;
            }
          }
        }
      }


      // Vẽ Waiting Process
      for (const val of waitingArray[value]) {

        dataSource.tasks.task.push({
          label: WAITING.label,
          processid: value,
          start: `${val.start + 1}/6/2020`,
          end: `${val.end + 1}/6/2020`,
          bordercolor: WAITING.bordercolor,
          color: WAITING.color
        });

        waitingTimeResult[index] += val.end - val.start;
      }

      for (const val of result.Process[index]) {
        // Vẽ CPU Process
        if (val.start !== result.IO[index][0].start && val.end !== result.IO[index][0].end) {
          dataSource.tasks.task.push({
            label: CPU.label,
            processid: value,
            start: `${val.start + 1}/6/2020`,
            end: `${val.end + 1}/6/2020`,
            bordercolor: CPU.bordercolor,
            color: CPU.color
          });

          totalTimeResult[index] += val.end - val.start;
        }

        // Terminated
        if (result.Process[index].indexOf(val) === 0) {
          dataSource.tasks.task.push({
            label: TERMINATED.label,
            processid: value,
            start: `${val.end + 1}/6/2020`,
            end: `${val.end + 1}/6/2020`,
            bordercolor: TERMINATED.bordercolor,
            color: TERMINATED.color
          });
        }
      }
    }

  }

  calFinalResult(
    responseTimeResult: Array<any>,
    waitingTimeResult: Array<any>,
    ioTimeResult: Array<any>,
    totalTimeResult: Array<any>
    ) {
    for (const [index] of waitingTimeResult.entries()) {
      waitingTimeResult[index] += responseTimeResult[index];
      totalTimeResult[index] += waitingTimeResult[index];
      totalTimeResult[index] += ioTimeResult[index];
    }
  }

  run() {
    const result: Array<Array<any>> = this.al.runRoundRobinScheduler(
      this.names,
      this.inputValue,
      this.quantum
    );
    this.result = this.getProcAndIO(result);
    this.setValueToGanttChart(
      this.names,
      this.arriveTime,
      this.result,
      this.responseTimeResult,
      this.waitingTimeResult,
      this.ioTimeResult,
      this.totalTimeResult
    );
    this.chartFlag = true;
    this.calFinalResult(
      this.responseTimeResult,
      this.waitingTimeResult,
      this.ioTimeResult,
      this.totalTimeResult
    );
  }
}
