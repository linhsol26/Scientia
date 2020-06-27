import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from 'src/app/services/auth.service';
import { AuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    public authServiceInApp: AuthenticateService,
    public userService: UserService,
    public crudService: CrudCoursesService
  ) {
    this.afAuth.authState.subscribe(usr => {
      this.isLogin = !(usr == null);
      this.userDetails = usr;
    });

    this.authService.authState.subscribe(urs => {
      this.isLoginFB = !(urs == null);
      this.userDetails = urs;
    });
  }

  @Output() changeState = new EventEmitter<boolean>();
  isLogin: boolean;
  opened: boolean;
  isLoginFB: boolean;
  userDetails = null;
  user: Array<any> = [];

  ngOnInit() {
  }

  changeEvent() {
    this.changeState.emit(!this.opened);
    this.opened = !this.opened;
  }
}
