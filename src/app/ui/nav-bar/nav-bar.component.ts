import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private dataService: DataService) { }

  opened: boolean;

  ngOnInit() {
    this.dataService.currentEvent.subscribe(event => this.opened = event);
  }

  changeEvent() {
      this.dataService.changeEvent(!this.opened);
  }
}
