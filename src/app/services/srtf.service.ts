import { Injectable } from '@angular/core';
import { Process, Task, Queue, TaskType} from '../algorithm-core/srtf';

@Injectable({
  providedIn: 'root'
})
export class SrtfService {

  constructor() { }

  initProcess(phases: [], arriveTime: [], cpu: [], io: [], cpu2: []) {
    const procList = new Array<Process>();

    for (let i = 0; i < arriveTime.length; i++) {
      const tempTask = new Queue<Task>();
      for (let j = i; j < i + 1; j++) {
        tempTask.enQueue(new Task(TaskType.CPU, cpu[j]));
        tempTask.enQueue(new Task(TaskType.IO, io[j]));
        tempTask.enQueue(new Task(TaskType.CPU, cpu2[j]));
        break;
      }
      procList.push(new Process(phases[i], arriveTime[i], tempTask));
    }

    return procList;
  }


}
