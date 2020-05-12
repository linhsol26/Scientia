import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  opened: boolean;

  constructor(private route: Router) { }
  data = [
    {
      icon: 'home',
      desc: 'Home',
      path: '/home'
    },
    {
      icon: 'menu',
      desc: 'Menu',
      path: ''
    }
  ];
  ngOnInit() {
  }

  router(router: string) {
    this.route.navigateByUrl(router);
  }
}
