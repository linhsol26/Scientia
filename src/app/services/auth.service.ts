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
    this.isAuth();
  }

  isLogin$: Observable<any>;
  isLoginFB$: Observable<any>;
  isLogin = false;
  isLoginFB = false;
  tempName: string = null;
  private setUser() {
    this.user = {
      ...this.userDetails
    };
  }

  isAuth() {
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

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      this.fireStore.collection('users').doc<User>(user.user.uid).set({
        email: user.user.email,
        displayName: user.user.displayName,
        photoURL: user.user.photoURL,

      });
    });
    this.router.navigate(['home']);
    this.userDetails = this.afAuth.currentUser;
    this.setUser();
  }

  async signUp(emailI: string, passwordI: string, name: string) { // add displayName here
    const user = await this.afAuth.createUserWithEmailAndPassword(emailI, passwordI);
    await this.fireStore.collection('users').doc<User>(user.user.uid).set({
      email: emailI,
      displayName: name,
      photoURL: user.user.photoURL
    });
  }

  async signIn(email: string, password: string) {
    const user = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.userDetails = user;
    this.setUser();
  }

  async signOut() {
    await this.afAuth.signOut().then(() => {
      this.snackBar.open('You are out!', 'See you next time', { duration: 2000 });
      this.router.navigate(['login']);
      this.userDetails = null;
      this.user = null;
    });
  }

  async signInWithFB() {
    const user = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(usr => {
      this.fireStore.collection('users').doc<User>(usr.id).set({
        email: usr.email,
        displayName: usr.name,
        photoURL: usr.photoUrl
      });
    });
    this.userDetails = user;
    this.setUser();
  }

  async signOutFB() {
    await this.authService.signOut().then(
      () => {
        this.snackBar.open('You are out!', 'See you next time', { duration: 2000 });
        this.router.navigate(['login']);
      }
    );
  }
}
