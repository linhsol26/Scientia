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
  @Output() changeState = new EventEmitter<boolean>();
  opened: boolean;

  ngOnInit() {

  }

  changeEvent() {
      console.log('bf: ' + this.opened);
      this.changeState.emit(!this.opened);
      this.opened = !this.opened;
      console.log('af: ' + this.opened);
  }
}
