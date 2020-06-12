export interface Item {
  label: string;
  color: string;
}

export interface Task {
  label: string;
  processid: string;
  start: string;
  end: string;
  bordercolor: string;
  color: string;
}

export interface DataSource {
  chart: object;
  legend: {
      item: Item[]
  };
  tasks: {
      task: Task[]
  };
  processes: object;
  categories: Array<object>;
}

export interface Result {
  Process: Array<any>;
  IO: Array<any>;
}

// State variable
export const RESPONSE = {
  label: 'Response',
  bordercolor: '#CCCCCC',
  color: '#CCCCCC',
};

export const CPU = {
  label: 'CPU',
  bordercolor: '#62B58D',
  color: '#62B58D',
};

export const WAITING = {
  label: 'Waiting',
  bordercolor: '#FFFFCC',
  color: '#FFFFCC',
};

export const IO = {
  label: 'IO',
  bordercolor: '#F2726F',
  color: '#F2726F',
};

export const TERMINATED = {
  label: 'Terminated',
  bordercolor: '#000000',
  color: '#000000',
};

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
