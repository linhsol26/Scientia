import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  data = [
    {
      title: '1',
      // tslint:disable-next-line:max-line-length
      content: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg'
    },
    {
      title: '2',
      // tslint:disable-next-line:max-line-length
      content: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      action: '',
      pic: '../../../assets/system.svg'
    }
  ];
  ngOnInit() {
  }

}
