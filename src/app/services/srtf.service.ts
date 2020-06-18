import { Injectable } from '@angular/core';
import { Process, StoryEvent, SrtfScheduler, Storyboard} from '../algorithm-core/srtf';

@Injectable({
  providedIn: 'root'
})
export class SrtfService {

  constructor() { }

  runAlgo(procList: Array<Process>, phases: string[]) {
    const scheduler = new SrtfScheduler(procList);

    // Nhận kết quả trả về là một Storyboard
    const story: Storyboard = scheduler.scheduling();

    let result: Array<any> = [];

    story.Story.forEach((value: StoryEvent) => {
        result.push({
          startTime: value.Description === 'Arrived' ? value.Time : value.Time - 1,
          endTime: value.Time,
          Name: value.ProcessName,
          Task: value.Description,
        });
      });

    result = [... new Set(result)];
    // catch bug IO
    for (let i = 0; i < result.length; i++) {
      if (result[i].startTime === result[i].endTime) {
        continue;
      }
      const current = result[i - 1];
      const next = result[i];
      if (current.startTime === next.startTime) {
        if (current.Task === 'CPU') {
          next.startTime++;
          next.endTime++;
        }
      }
    }
    // catch bug CPU
    for (let i = 0; i < result.length; i++) {
      if (result[i].startTime === result[i].endTime) {
          continue;
      }
      const previous = result[i - 1];
      const current = result[i];
      const next = result[i + 1];
      if (next !== undefined) {
        if ((previous.startTime === next.startTime) &&
            (previous.endTime === next.endTime) &&
            (previous.Name === next.Name) &&
            (previous.Task !== next.Task)) {
          for (let j = i; j < result.length; j++) {
            if (result[j].Task === 'CPU') {
              result[j].startTime++;
              result[j].endTime++;
            } else if (result[j].Task === 'IO') {
              result[j].startTime++;
              result[j].endTime++;
            }
          }
        }

        if ((current.startTime === next.startTime) &&
        (current.endTime === next.endTime) &&
        (current.Name === next.Name) &&
        (current.Task !== next.Task)) {
          for (let j = i; j < result.length; j++) {
            if (result[j].Task === 'CPU') {
                result[j].startTime++;
                result[j].endTime++;
            } else if (result[j].Task === 'IO') {
                result[j].startTime++;
                result[j].endTime++;
            }
          }
        }
      }
  }
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

    const resultArray: Array<any> = [];
    result.forEach(element => {
      resultArray.push([
          element.Name,
          element.Task,
          element.startTime * 1000,
          element.endTime * 1000
      ]);
    });
    console.log(result);
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
    // for (let i = 0; i < phases.length; i++) {
    //   for (let j = 0; j < tempArray[i].length; j++) {
    //     if (tempArray[i][j].startTime === tempArray[i][j].endTime) {
    //         continue;
    //     } else {
    //       const current = tempArray[i][j - 1].endTime;
    //       const next = tempArray[i][j].startTime;
    //       if (current !== next) {
    //         if ((tempArray[i][j - 1].Task === 'CPU' && (tempArray[i][j].Task === 'CPU' || tempArray[i][j].Task === 'IO'))
    //         || (tempArray[i][j - 1].Task === 'IO' && (tempArray[i][j].Task === 'CPU' || tempArray[i][j].Task === 'CPU'))
    //         ) {
    //           resultArray.push([
    //               tempArray[i][j].Name,
    //               'Waiting',
    //               current * 1000,
    //               next * 1000
    //           ]);
    //         }
    //       }
    //     }
    //   }
    // }
    return [...new Set(resultArray)];
    }
  }


