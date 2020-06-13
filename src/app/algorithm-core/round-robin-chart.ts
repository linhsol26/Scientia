export interface Item {
  label: string;
  color: string;
}

export interface Process {
  label: string;
  id: string;
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
      item: Item[];
  };
  tasks: {
      task: Task[];
  };
  processes: {
    isbold: string;
    headertext: string;
    process: Process[];
  };
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
