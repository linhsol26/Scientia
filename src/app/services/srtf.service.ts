import { Injectable } from '@angular/core';
import { Process, Task, Queue, TaskType, StoryEvent, SrtfScheduler, Storyboard} from '../algorithm-core/srtf';

@Injectable({
  providedIn: 'root'
})
export class SrtfService {

  constructor() { }

  runAlgo(procList: Array<Process>, phases: string[]) {
    const scheduler = new SrtfScheduler(procList);

    // Nhận kết quả trả về là một Storyboard
    const story: Storyboard = scheduler.scheduling();

    const result: Array<any> = [];

    story.Story.forEach((value: StoryEvent) => {
        result.push({
          startTime: value.Description === 'Arrived' ? value.Time : value.Time - 1,
          endTime: value.Time,
          Name: value.ProcessName,
          Task: value.Description,
        });
      });

// filter each Process
    const eachProcess: Array<any> = [];
    for (const i of phases) {
        result.forEach(element => {
          if (element.Name === i) {
            eachProcess.push(element);
          }
        });
    }

    const resultArray: Array<any> = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < phases.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        if (phases[i] === eachProcess[i].Name) {
          eachProcess.forEach(element => {
            resultArray.push([
              element.Name,
              element.Task,
              element.startTime * 1000,
              element.endTime * 1000
            ]);
          });
        }
    }

    // slice each process
    const tempArray: Array<Array<any>> = [];
    for (const i of phases) {
        const temp = eachProcess.filter(element => {
            if (element.Name === i) {
                return element;
            }
        });
        tempArray.push(temp);
    }

    // push Terminated
    for (let i = 0; i < phases.length; i++) {
      for (let j = tempArray[i].length - 1; j > i; j--) {
          resultArray.push([
              tempArray[i][j].Name,
              'Terminated',
              tempArray[i][j].endTime * 1000,
              tempArray[i][j].endTime * 1000
          ]);
          break;
      }
    }
    return resultArray;
  }
}


