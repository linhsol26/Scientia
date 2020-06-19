import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../model/user.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  user: User;
  private userDetails: any;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    public fireStore: AngularFirestore
  ) {
    this.isLogin$ = this.afAuth.authState;
    this.afAuth.authState.subscribe((usr) => {
      this.isLogin = !(usr == null);
      if (usr != null) {
        this.userDetails = usr;
        this.setUser();
      }
    });

    this.isLoginFB$ = this.authService.authState;
    this.authService.authState.subscribe((usr) => {
      this.isLoginFB = !(usr == null);
      if (usr != null) {
        this.userDetails = usr;
        this.setUser();
      }
    });
  }

  isLogin$: Observable<any>;
  isLoginFB$: Observable<any>;
  isLogin = false;
  isLoginFB = false;

  private setUser() {
    this.user = {
      ...this.userDetails
    };
  }
  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      this.fireStore.collection('users').doc<User>(user.user.uid).set({
        email: user.user.email,
        displayName: user.user.displayName,
        photoURL: user.user.photoURL,
      });
    }).then(
      () => {
        this.snackBar.open('You are in!', 'Have fun :D', { duration: 2000 });
        this.router.navigate(['/home']);
        this.isLogin = true;
        this.userDetails = this.afAuth.currentUser;
        this.setUser();
      }
    );
  }
  async signUp(email: string, password: string) { // add displayName here
    await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async signIn(email: string, password: string) {
    const user = await this.afAuth.signInWithEmailAndPassword(email, password);
    await this.fireStore.collection('users').doc<User>(user.user.uid).set({
      email: user.user.email,
      displayName: user.user.displayName,
      photoURL: user.user.photoURL
    });
    this.isLogin = true;
    this.userDetails = user;
    this.setUser();
  }

  async signOut() {
    await this.afAuth.signOut().then(() => {
      this.snackBar.open('You are out!', 'See you next time', { duration: 2000 });
      this.router.navigate(['/login']);
      this.userDetails = null;
      this.user = null;
      this.isLogin = false;
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      () => {
        this.snackBar.open('You are in!', 'Have fun :D', { duration: 2000 });
        this.router.navigate(['/home']);
        this.isLoginFB = true;
        this.userDetails = this.afAuth.currentUser;
        this.setUser();
      }
    );
  }

  signOutFB(): void {
    this.snackBar.open('You are out!', 'See you next time', { duration: 2000 });
    this.router.navigate(['/login']);
    this.isLoginFB = false;
    this.authService.signOut();
  }
}
