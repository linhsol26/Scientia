import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../model/user.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
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
    public authService: AuthService
  ) {
    this.isLogin$ = this.afAuth.authState;
    this.afAuth.authState.subscribe((usr) => {
      this.isLogin = !(usr == null);
      if (usr != null) {
        this.userDetails = usr;
        this.setUser();
      }
    });
  }

  isLogin$: Observable<any>;
  isLogin = false;

  private setUser() {
    this.user = {
      ...this.userDetails
    };
  }
  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      () => {
        this.snackBar.open('You are in!', 'Have fun :D', { duration: 2000 });
        this.router.navigate(['/home']);
        this.isLogin = true;
        this.userDetails = this.afAuth.currentUser;
        this.setUser();
      }
    );
  }
  async signUp(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async signIn(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    await this.afAuth.signOut().then(() => {
      this.userDetails = null;
      this.user = null;
    });
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      () => {
        this.snackBar.open('You are in!', 'Have fun :D', { duration: 2000 });
        this.router.navigate(['/home']);
        this.isLogin = true;
        this.userDetails = this.afAuth.currentUser;
        this.setUser();
      }
    );
  }
  signOutFB(): void {
    this.authService.signOut();
  }
}
