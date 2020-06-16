import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudCoursesService {

  datas = [
    {
      title: '1',
      // tslint:disable-next-line:max-line-length
      desc: 'Example Algorithm with multi I/O ... :(( Please WORKKKKKKKKKKKKKKKKK :((',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'lthdh',
      content: [
        {
          name: 'FCFS',
          // tslint:disable-next-line:max-line-length
          inf: 'Given n processes with their burst times, the task is to find average waiting time and average turn around time using FCFS scheduling algorithm.'
        },
        {
          name: 'SJF',
          inf: 'Sometime it work and sometime isnt work'
        },
        {
          name: 'Round Robin',
          inf: 'Something'
        },
        {
          name: 'SRTF',
          inf: 'Hope it gonna run WELL:)'
        }
        // tslint:disable-next-line:max-line-length
        // ['',
        //   'content 2', 'content 3', 'content 4'
        // ]
      ]
    },
    {
      title: '2',
      // tslint:disable-next-line:max-line-length
      desc: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'dm',
      content: [
        {
          name: 'FCFS',
          // tslint:disable-next-line:max-line-length
          inf: 'Given n processes with their burst times, the task is to find average waiting time and average turn around time using FCFS scheduling algorithm.'
        },
        {
          name: 'SJF',
          inf: ' '
        }
        // tslint:disable-next-line:max-line-length
        // ['',
        //   'content 2', 'content 3', 'content 4'
        // ]
      ]
    },
    {
      title: '3',
      // tslint:disable-next-line:max-line-length
      desc: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'dm',
      // content: [

      //   // tslint:disable-next-line:max-line-length
      //   // ['',
      //   //   'content 2', 'content 3', 'content 4'
      //   // ]
      // ]
    },
    {
      title: '4',
      // tslint:disable-next-line:max-line-length
      desc: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'dm',
      // content: {
      //   title: ' '
      // }
    },
    {
      title: '5',
      // tslint:disable-next-line:max-line-length
      desc: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'dm',
      // content: {
      //   title: ' '
      // }
    },
    {
      title: '6',
      // tslint:disable-next-line:max-line-length
      desc: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'dm',
      // content: {
      //   title: ' '
      // }
    },

  ];

  index: any; // lthdh
  content: any;
  constructor(

  ) { }

  getIndex(course) {
    this.index = course;
    return this.index;
  }

  getContent() {
    this.datas.forEach(async element => {
      if (element.course === this.index) {
        this.content = element.content;
      }
    });
    return this.content;
  }
}
