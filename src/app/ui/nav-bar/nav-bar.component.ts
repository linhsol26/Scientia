import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  opened: boolean;
  @Output() data = new EventEmitter();
  ngOnInit() {
  }
  change() {
      this.opened = !this.opened;
      this.data.emit(this.opened);
  }
}
