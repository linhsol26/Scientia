import { Injectable } from '@angular/core';
import { Process, Task, Queue, TaskType, StoryEvent, FcfsScheduler, Storyboard} from '../algorithm-core/fcfs';
@Injectable({
  providedIn: 'root'
})
export class FcfsService {

  constructor() { }
  runAlgo(procList: Array<Process>, phases: string[]) {
    const scheduler = new FcfsScheduler(procList);

    // Nhận kết quả trả về là một Storyboard
    const story: Storyboard = scheduler.scheduling();

    const countTime = [];

    story.Story.forEach((value: StoryEvent) => {
      countTime.push({
        Time: value.Time,
        Name: value.ProcessName,
        Task: value.Description,
      });
    });

    const seProcess: Array<Array<any>> = [];
    for (const name of phases) {
      const newArr = countTime.filter((value) =>
        value.Name === name ? value : null
      );
      seProcess.push(newArr);
    }

    const resultProcess = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < seProcess.length; i++) {
      const newArr = [];
      newArr.push({
        Arrived: seProcess[i].filter((value) => value.Task === 'Arrived' ? value.Time : null),
        CPU: seProcess[i].filter((value) => value.Task === 'CPU' ? value.Time : null),
        IO: seProcess[i].filter((value) => value.Task === 'IO' ? value.Time : null),
        Terminated: seProcess[i].filter((value) => value.Task === 'Terminated' ? value.Time : null),
      });
      // [][]
      resultProcess.push(newArr);
    }

    return resultProcess;
  }
}
