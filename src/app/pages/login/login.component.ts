import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  signIn() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.signInWithPopup(provider).then(res => {
        resolve(res);
        this.snackBar.open('You are in!', 'Have fun :D', {duration: 2000});
        this.router.navigate(['/home']);
      // tslint:disable-next-line:no-shadowed-variable
      }).catch((reject) => {
        this.snackBar.open(reject, 'Please try again.', {duration: 2000});
      });
    });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.snackBar.open('You are out!', 'See you!', {duration: 2000});
    });
  }
}
