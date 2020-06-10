import { Injectable } from '@angular/core';
import {
  TaskType,
  Task,
  Process,
  StoryEvent,
  Storyboard,
  Queue,
  RoundRobinScheduler
} from '../algorithm-core/round-robin';

@Injectable({
  providedIn: 'root',
})
export class RoundRobinService {
  constructor() {}

  initTaskQueue = (names: Array<any>, inputValue: Array<any>) => {
    const procList = new Array<Process>();

    for (let i = 0; i < inputValue.length; i++) {
      const taskQueue = new Queue<Task>();
      for (let j = 0; j < inputValue[i].length; j++) {
        if (j % 2 === 0) {
          taskQueue.enQueue(new Task(TaskType.CPU, inputValue[i][j]));
        } else {
          taskQueue.enQueue(new Task(TaskType.IO, inputValue[i][j]));
        }
      }

      procList.push(new Process(names[i], i, taskQueue));
    }

    return procList;
  }

  runRoundRobinScheduler(names: string[], inputValue: Array<Array<number>>, quantum: number) {
    const RoundRobin = [];
    const IOQueue = [];

    const procList = this.initTaskQueue(names, inputValue);
    // Chọn thuật toán điều phối
    const scheduler = new RoundRobinScheduler(procList, quantum);

    // Nhận kết quả trả về là một Storyboard
    const story: Storyboard = scheduler.scheduling();

    story.Story.forEach((value: StoryEvent) => {
      RoundRobin.push({
        Time: value.Time,
        Name: value.ProcessName,
        Task: value.Description,
      });
    });

    const seProcess: Array<Array<any>> = [];
    for (const name of names) {
      const newArr = RoundRobin.filter((value) =>
        value.Name === name ? value : null
      );
      seProcess.push(newArr);
    }

    const resultProcess = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < seProcess.length; i++) {
      const newArr = [];
      newArr.push({
        Arrived: seProcess[i].filter((value) => value.Task === 'Arrived' ? value.Time : null),
        CPU: seProcess[i].filter((value) => value.Task === 'CPU' ? value.Time : null),
        IO: seProcess[i].filter((value) => value.Task === 'IO' ? value.Time : null),
        Terminated: seProcess[i].filter((value) => value.Task === 'Terminated' ? value.Time : null),
      });

      resultProcess.push(newArr);
    }

    return resultProcess;
  }

}
