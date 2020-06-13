import { Component, OnInit, NgZone } from '@angular/core';
import { RoundRobinService } from 'src/app/services/round-robin.service';
import { DataSource, Result, RESPONSE, CPU, WAITING, IO, TERMINATED } from 'src/app/algorithm-core/round-robin-chart';

import * as lodash from 'lodash';

const dataSource: DataSource = {
  chart: {
    caption: 'Machine Operating Schedule For Round Robin Algorithm',
    subcaption: 'Process Chart',
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
      category: [
        {
          start: '1/6/2020',
          end: '4/7/2020',
          name: 'Clock',
        },
      ],
    },
    {
      bgalpha: '0',
      category: [
        {
          start: '1/6/2020',
          end: '4/7/2020',
          label: 'Times',
        },
      ],
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

  // Table
  displayedColumns: string[] = ['Name', 'ArriveTime', 'BurstTime1', 'IO', 'BurstTime2'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Array<any> = [
    { Name: 'P1', ArriveTime: 0, BurstTime1: 2, IO: 2, BurstTime2: 4 },
    { Name: 'P2', ArriveTime: 1, BurstTime1: 3, IO: 2, BurstTime2: 5 },
    { Name: 'P3', ArriveTime: 2, BurstTime1: 1, IO: 3, BurstTime2: 5 },
    { Name: 'P4', ArriveTime: 3, BurstTime1: 5, IO: 4, BurstTime2: 1 },
    { Name: 'P5', ArriveTime: 4, BurstTime1: 2, IO: 1, BurstTime2: 1 },
  ];

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

  constructor(public al: RoundRobinService) {
    this.dataSource = dataSource;
  }

  ngOnInit(): void {
    this.getNamesAndArriveTime();
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

        // Tính response time
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

        // Tính response time
        responseTimeResult[index] += calResponse.start - arriveTime[index];
      }

      for (const val of result.Process[index]) {

        // Vẽ CPU Process
        dataSource.tasks.task.push({
            label: CPU.label,
            processid: value,
            start: `${val.start + 1}/6/2020`,
            end: `${val.end + 1}/6/2020`,
            bordercolor: CPU.bordercolor,
            color: CPU.color
        });

        totalTimeResult[index] += val.end - val.start;

        // Lấy Waiting time
        if (waitingArray[value] === undefined) {
          waitingArray[value] = [];
        }

        const waitingStart = result.Process[index][result.Process[index].indexOf(val) + 1];
        if (waitingStart) {
          waitingArray[value].push({
            start: waitingStart.end,
            end: val.start
          });
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

      // Vẽ Waiting Process
      for (const val of waitingArray[value]) {
        if (val.start === result.IO[index][0].start) {
          const i = waitingArray[value].indexOf(val);
          waitingArray[value][i].start += result.IO[index][0].end - result.IO[index][0].start;
        }

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

    console.log(this.responseTimeResult);
    console.log(this.waitingTimeResult);
    console.log(this.ioTimeResult);
    console.log(this.totalTimeResult);
  }
}
