import { Component, OnInit } from '@angular/core';
import { DataSource, WAITING, IO, TERMINATED, CPU, RESPONSE, Result } from 'src/app/algorithm-core/chart';
import { SrtfService } from 'src/app/services/srtf.service';
import * as lodash from 'lodash';
import { Process, Queue, Task, TaskType } from 'src/app/algorithm-core/srtf';
import { async } from '@angular/core/testing';
import { sum } from 'lodash';

@Component({
  selector: 'app-srtf-algorithm',
  templateUrl: './srtf-algorithm.component.html',
  styleUrls: ['./srtf-algorithm.component.scss']
})
export class SrtfAlgorithmComponent implements OnInit {
  timer: Array<any> = [];
  dataSource1: DataSource = {
    chart: {
      caption: 'Machine Operating Schedule For Shortest Remaining Time First Algorithm',
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
        bgalpha: '0',
        // category: [
        //   {
        //     start: '1/6/2020',
        //     end: '30/6/2020',
        //     label: 'Times',
        //   },
        // ],
        category: this.timer
      },
    ],
  };

  // Lodash library
  _: any = lodash;

  // tslint:disable-next-line:ban-types
  dataSource: any;
  result;

  // Table
  displayedColumns: string[] = ['Name', 'ArriveTime', 'BurstTime1', 'IO', 'BurstTime2'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  // Algo Data
  tempData = {arriveTime: 0, cpu: 0, io: 0, cpu2: 0};
  phases: string[] = [];
  arriveTime: number[] = [];
  cpu: number[] = [];
  io: number[] = [];
  cpu2: number[] = [];
  inputArray: Array<Process> = [];

  // Chart Data
  chartFlag = false;
  responseTime: number[] = [];
  waitingTime: number[] = [];
  totalTime: number[] = [];
  ioTime: number[] = [];

  // input
  inputFlag = false;
  buttonFlag = true;
  numOfProcess: number;
  inputData: Array<any> = [];

  constructor(public algo: SrtfService) {
    this.dataSource = this.dataSource1;
  }

  ngOnInit(): void {
    for (let i = 0; i <= 31; i++) {
      this.timer.push({
        start: i.toString() + '/6/2020',
        end: (i + 1).toString() + '/6/2020',
        label: i.toString(),
      });
    }
  }

  // init waiting time, response time and total time
  initProcess() {
    const procList = new Array<Process>();

    for (let i = 0; i < this.arriveTime.length; i++) {
      const tempTask = new Queue<Task>();
      for (let j = i; j < i + 1; j++) {
        tempTask.enQueue(new Task(TaskType.CPU, this.cpu[j]));
        tempTask.enQueue(new Task(TaskType.IO, this.io[j]));
        tempTask.enQueue(new Task(TaskType.CPU, this.cpu2[j]));
        break;
      }
      this.waitingTime.push(0);
      this.responseTime.push(0);
      this.totalTime.push(0);
      procList.push(new Process(this.phases[i], this.arriveTime[i], tempTask));
    }
    return procList;
  }

  getProcAndIO(resultProcess) {
    const cpuProcess = [];
    const ioProcess = [];

    for (let i = 0; i < this.phases.length; i++) {
      const cpuTime = [];
      const ioTime = [];

      // Lấy tiến trình CPU của từng Process
      for (let j = resultProcess[i][0].CPU.length - 1; j >= 0; j--) {
        if (
          (resultProcess[i][0].CPU[j - 1] !== undefined &&
            resultProcess[i][0].CPU[j] !== undefined &&
            resultProcess[i][0].CPU[j + 1] !== undefined) ||
          (resultProcess[i][0].CPU[j - 1] !== undefined &&
            resultProcess[i][0].CPU[j] !== undefined) ||
          (resultProcess[i][0].CPU[j] !== undefined &&
            resultProcess[i][0].CPU[j + 1] !== undefined)
        ) {
          let startTime = 0;
          const endTime = resultProcess[i][0].CPU[j].Time;

          const currentTime = resultProcess[i][0].CPU[j].Time;
          let previousTime = 0;
          let nextTime = 0;
          if (resultProcess[i][0].CPU[j + 1] !== undefined) {
            nextTime = resultProcess[i][0].CPU[j + 1].Time;
          }

          if (resultProcess[i][0].CPU[j - 1] !== undefined) {
            previousTime = resultProcess[i][0].CPU[j - 1].Time;
            startTime = resultProcess[i][0].CPU[j - 1].Time - 1;
          }

          if (endTime - startTime === 1) {
            cpuTime.push({
              name: resultProcess[i][0].CPU[j].Name,
              start: startTime,
              end: endTime,
            });
          } else if (
            (nextTime - currentTime >= 1 && j === 0) ||
            (currentTime - previousTime >= 1 &&
              j === resultProcess[i][0].CPU.length - 1) ||
            (nextTime - currentTime >= 1 &&
              currentTime - previousTime >= 1)
          ) {
            cpuTime.push({
              name: resultProcess[i][0].CPU[j].Name,
              start: currentTime - 1,
              end: currentTime,
            });
          }
        }
      }
      cpuProcess.push(cpuTime);

      // Lấy tiến trình IO
      const startTimeIO = resultProcess[i][0].IO[0].Time - 1;
      const endTimeIO = resultProcess[i][0].IO[resultProcess[i][0].IO.length - 1].Time;
      ioTime.push({
          name: resultProcess[i][0].IO[0].Name,
          start: startTimeIO,
          end: endTimeIO,
      });

      ioProcess.push(ioTime);
    }
    return {
      Process: cpuProcess,
      IO: ioProcess
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
      this.dataSource.processes.process.push({
        label: value,
        id: value
      });

      // Vẽ Response Time
      const calResponse = result.Process[index][result.Process[index].length - 1];
      if (calResponse.start === arriveTime[index]) {
        this.dataSource.tasks.task.push({
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
        this.dataSource.tasks.task.push({
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
        this.dataSource.tasks.task.push({
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
          this.dataSource.tasks.task.push({
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
        this.dataSource.tasks.task.push({
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

        this.dataSource.tasks.task.push({
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
    const result: Array<Array<any>> = this.algo.runAlgo(
      this.inputArray,
      this.phases,
    );
    this.result = this.getProcAndIO(result);
    this.setValueToGanttChart(
      this.phases,
      this.arriveTime,
      this.result,
      this.responseTime,
      this.waitingTime,
      this.ioTime,
      this.totalTime
    );
    this.chartFlag = true;
    this.calFinalResult(
      this.responseTime,
      this.waitingTime,
      this.ioTime,
      this.totalTime
    );

    console.log(this.responseTime);
    console.log(this.waitingTime);
    console.log(this.ioTime);
    console.log(this.totalTime);
  }

  // confirm Number Of Processes user input
  confirmNOP() {
    if (this.buttonFlag) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.numOfProcess; i++) {
        this.inputData.push({...this.tempData});
      }
      this.buttonFlag = false;
    }
    console.log(this.inputData);
  }
  // add process
  add() {
    this.inputData.push({...this.tempData});
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
      this.cpu.push(this.inputData[i].cpu);
      this.io.push(this.inputData[i].io);
      this.cpu2.push(this.inputData[i].cpu2);
    }
    this.inputFlag = true;
    this.inputArray = this.initProcess();
  }
}
