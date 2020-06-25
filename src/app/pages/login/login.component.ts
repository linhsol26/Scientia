import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin = true;
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe(usr => {
      this.isLogin = !(usr == null);
    });

    this.authService.authState.subscribe(urs => {
      this.isLogin = !(urs == null);
    });
  }

  ngOnInit() {
  }
}
