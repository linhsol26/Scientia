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

    // catch result raw error
    for (let i = 0; i < phases.length; i++) {
      for (let j = 0; j < tempArray[i].length; j++) {
          if (tempArray[i][j].startTime === tempArray[i][j].endTime) {
              continue;
          } else {
              const current = tempArray[i][j - 1];
              const next = tempArray[i][j];
              if (current.startTime === next.startTime && current.Task !== 'Arrived') {
                  next.startTime++;
                  next.endTime++;
              }
          }
      }
    }
    const resultArray: Array<any> = [];
    for (let i = 0; i < phases.length; i++) {
      tempArray[i].forEach(element => {
          resultArray.push([
              element.Name,
              element.Task,
              element.startTime * 1000,
              element.endTime * 1000
          ]);
      });
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
    // push response
    for (let i = 0; i < phases.length; i++) {
      for (let j = 0; j < tempArray[i].length; j++) {
        if (tempArray[i][j].startTime === tempArray[i][j].endTime) {
            continue;
        } else {
            const current = tempArray[i][j - 1].endTime;
            const next = tempArray[i][j].startTime;
            if (current === next) {
                break;
            } else {
              resultArray.push([
                  tempArray[i][j].Name,
                  'Response',
                  current * 1000,
                  next * 1000
              ]);
              break;
            }
          }
        }
      }

    // push waiting time
    for (let i = 0; i < phases.length; i++) {
      for (let j = 0; j < tempArray[i].length; j++) {
        if (tempArray[i][j].startTime === tempArray[i][j].endTime) {
            continue;
        } else {
          const current = tempArray[i][j - 1].endTime;
          const next = tempArray[i][j].startTime;
          if (current !== next) {
            if ((tempArray[i][j - 1].Task === 'CPU' && (tempArray[i][j].Task === 'CPU' || tempArray[i][j].Task === 'IO'))
            || (tempArray[i][j - 1].Task === 'IO' && (tempArray[i][j].Task === 'CPU' || tempArray[i][j].Task === 'CPU'))
            ) {
              resultArray.push([
                  tempArray[i][j].Name,
                  'Waiting',
                  current * 1000,
                  next * 1000
              ]);
            }
          }
        }
      }
    }
    return resultArray;
    }
  }


