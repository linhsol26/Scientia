import { Component, OnInit, NgZone } from '@angular/core';
import { RoundRobinService } from 'src/app/services/round-robin.service';

const dataSource = {
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
    task: [
      // Process P1
      {
        label: 'Response',
        processid: 'P1',
        start: '1/6/2020',
        end: '1/6/2020',
        bordercolor: '#CCCCCC',
        color: '#CCCCCC',
      },
      {
        label: 'CPU',
        processid: 'P1',
        start: '1/6/2020',
        end: '3/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P1',
        start: '3/6/2020',
        end: '5/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P1',
        start: '5/6/2020',
        end: '6/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'IO',
        processid: 'P1',
        start: '6/6/2020',
        end: '10/6/2020',
        bordercolor: '#F2726F',
        color: '#F2726F',
      },
      {
        label: 'Waiting',
        processid: 'P1',
        start: '10/6/2020',
        end: '12/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P1',
        start: '12/6/2020',
        end: '14/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P1',
        start: '14/6/2020',
        end: '19/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P1',
        start: '19/6/2020',
        end: '20/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Terminated',
        processid: 'P1',
        start: '20/6/2020',
        end: '20/6/2020',
        bordercolor: '#000000',
        color: '#000000',
      },
      // Process P2
      {
        label: 'Response',
        processid: 'P2',
        start: '2/6/2020',
        end: '3/6/2020',
        bordercolor: '#CCCCCC',
        color: '#CCCCCC',
      },
      {
        label: 'CPU',
        processid: 'P2',
        start: '3/6/2020',
        end: '5/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P2',
        start: '5/6/2020',
        end: '9/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P2',
        start: '9/6/2020',
        end: '10/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'IO',
        processid: 'P2',
        start: '10/6/2020',
        end: '12/6/2020',
        bordercolor: '#F2726F',
        color: '#F2726F',
      },
      {
        label: 'Waiting',
        processid: 'P2',
        start: '12/6/2020',
        end: '16/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P2',
        start: '16/6/2020',
        end: '18/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P2',
        start: '18/6/2020',
        end: '24/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P2',
        start: '22/6/2020',
        end: '24/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P2',
        start: '24/6/2020',
        end: '26/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P2',
        start: '26/6/2020',
        end: '27/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Terminated',
        processid: 'P2',
        start: '27/6/2020',
        end: '27/6/2020',
        bordercolor: '#000000',
        color: '#000000',
      },
      // Process 3
      {
        label: 'Response',
        processid: 'P3',
        start: '3/6/2020',
        end: '6/6/2020',
        bordercolor: '#CCCCCC',
        color: '#CCCCCC',
      },
      {
        label: 'CPU',
        processid: 'P3',
        start: '6/6/2020',
        end: '7/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'IO',
        processid: 'P3',
        start: '7/6/2020',
        end: '10/6/2020',
        bordercolor: '#F2726F',
        color: '#F2726F',
      },
      {
        label: 'Waiting',
        processid: 'P3',
        start: '10/6/2020',
        end: '14/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P3',
        start: '14/6/2020',
        end: '16/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P3',
        start: '16/6/2020',
        end: '20/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P3',
        start: '20/6/2020',
        end: '22/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P3',
        start: '22/6/2020',
        end: '24/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P3',
        start: '24/6/2020',
        end: '25/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Terminated',
        processid: 'P3',
        start: '25/6/2020',
        end: '25/6/2020',
        bordercolor: '#000000',
        color: '#000000',
      },
      // Process 4
      {
        label: 'Response',
        processid: 'P4',
        start: '4/6/2020',
        end: '7/6/2020',
        bordercolor: '#CCCCCC',
        color: '#CCCCCC',
      },
      {
        label: 'CPU',
        processid: 'P4',
        start: '7/6/2020',
        end: '9/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P4',
        start: '9/6/2020',
        end: '10/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P4',
        start: '10/6/2020',
        end: '12/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Waiting',
        processid: 'P4',
        start: '12/6/2020',
        end: '18/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P4',
        start: '18/6/2020',
        end: '19/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'IO',
        processid: 'P4',
        start: '19/6/2020',
        end: '23/6/2020',
        bordercolor: '#F2726F',
        color: '#F2726F',
      },
      {
        label: 'Waiting',
        processid: 'P4',
        start: '23/6/2020',
        end: '25/6/2020',
        bordercolor: '#FFFFCC',
        color: '#FFFFCC',
      },
      {
        label: 'CPU',
        processid: 'P4',
        start: '25/6/2020',
        end: '26/6/2020',
        bordercolor: '#62B58D',
        color: '#62B58D',
      },
      {
        label: 'Terminated',
        processid: 'P4',
        start: '26/6/2020',
        end: '26/6/2020',
        bordercolor: '#000000',
        color: '#000000',
      },
    ],
  },
  processes: {
    isbold: '1',
    headertext: 'Process',
    process: [
      {
        label: 'P1',
        id: 'P1',
      },
      {
        label: 'P2',
        id: 'P2',
      },
      {
        label: 'P3',
        id: 'P3',
      },
      {
        label: 'P4',
        id: 'P4',
      },
    ],
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
  // tslint:disable-next-line: ban-types
  dataSource: Object;

  // Table
  displayedColumns: string[] = ['Name', 'BurstTime1', 'IO', 'BurstTime2'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Array<any> = [
    { Name: 'P1', BurstTime1: 3, IO: 4, BurstTime2: 3 },
    { Name: 'P2', BurstTime1: 3, IO: 2, BurstTime2: 5 },
    { Name: 'P3', BurstTime1: 1, IO: 3, BurstTime2: 5 },
    { Name: 'P4', BurstTime1: 5, IO: 4, BurstTime2: 1 },
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

  // Chart variable

  constructor(public al: RoundRobinService) {
    this.dataSource = dataSource;
  }

  ngOnInit(): void {
    this.names = this.data.map((value) => value.Name);
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

  setValueToGanttChart(names: string[], result) {
    for (const [index, value] of names.entries()) {

    }
  }

  run() {
    const result: Array<Array<any>> = this.al.runRoundRobinScheduler(
      this.names,
      this.inputValue,
      this.quantum
    );
    console.log(result);
    this.result = this.getProcAndIO(result);
    console.log(this.result);
  }
}
