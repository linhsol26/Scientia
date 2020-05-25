import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudCoursesService {
  datas = [
    {
      title: '1',
      // tslint:disable-next-line:max-line-length
      content: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'lthdh'
    },
    {
      title: '2',
      // tslint:disable-next-line:max-line-length
      content: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg',
      course: 'dm'
    }
  ];

  constructor(

  ) { }

}
