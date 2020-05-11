import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  opened: boolean;

  constructor(private dataService: DataService) { }
  data = [
    {
      icon: 'home',
      desc: 'Home'
    },
    {
      icon: 'menu',
      desc: 'Menu'
    }
  ];
  ngOnInit() {
    this.dataService.currentEvent.subscribe(event => this.opened = event);
  }
}
