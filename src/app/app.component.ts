import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Scientia';
  @Input() opened: boolean;

  changeState(event) {
    this.opened = event;
    console.log('from app');
  }
}
