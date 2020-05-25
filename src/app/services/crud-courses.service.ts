import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudCoursesService {

  datas = [
    {
      title: '1',
      // tslint:disable-next-line:max-line-length
      desc: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'lthdh',
      content: [
        ['Điều phối tiến trình',
        'hello'],
        ['content', 'content2']
      ]
    },
    {
      title: '2',
      // tslint:disable-next-line:max-line-length
      desc: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'dm',
      // content: {
      //   title: ' '
      // }
    }
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
