import { Component, OnInit, Input } from '@angular/core';
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
      desc: '',
      path: '/home'
    },
  ];
  ngOnInit() {
  }

  router(router: string) {
    this.route.navigateByUrl(router);
  }
}
