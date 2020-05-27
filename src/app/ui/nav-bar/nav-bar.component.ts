import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from 'src/app/services/auth.service';

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
    public authService: AuthenticateService
  ) { }

  @Output() changeState = new EventEmitter<boolean>();
  isLogin: boolean;
  opened: boolean;
  userDetails = null;
  ngOnInit() {
    this.afAuth.authState.subscribe(usr => {
      this.isLogin = !(usr == null);
      this.userDetails = usr;
    });
  }

  changeEvent() {
    this.changeState.emit(!this.opened);
    this.opened = !this.opened;
  }

  // signOut() {
  //   this.authService.signOut().then(() => {
  //     this.router.navigate(['/login']);
  //     this.snackBar.open('You are out!', 'See you!', { duration: 2000 });
  //   });
  // }

}
