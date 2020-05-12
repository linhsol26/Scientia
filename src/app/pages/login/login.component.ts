import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // constructor(public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  // signIn() {
  //   return new Promise<any>((resolve, reject) => {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     provider.addScope('profile');
  //     provider.addScope('email');
  //     this.afAuth.signInWithPopup(provider).then(res => {
  //       resolve(res);
  //       this.router.navigate(['/home']);
  //     });
  //   });
  // }

  // signOut() {
  //   return this.afAuth.signOut().then(() => {
  //     this.router.navigate(['/login']);
  //   });
  // }
}
