import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticateService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLogin: boolean;
  hide = true;
  formGroup = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthenticateService
  ) { }

  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }
  get confirmPassword() { return this.formGroup.get('confirmPassword'); }
  ngOnInit() {
    this.afAuth.authState.subscribe(usr => {
      this.isLogin = !(usr == null);
    });
  }

  signUp() {
    if (this.email != null && this.password != null) {
      this.authService.signUp(this.email.value, this.password.value).then(
        () => {
          this.snackBar.open('Welcome to my site', '', { duration: 2000 });
          location.href = '/';
        }, err => {
          this.snackBar.open(err, '', { duration: 2000 });
        }
      );
    }
  }

  signInWithGoogle() {
    return new Promise<any>((resolve) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.signInWithPopup(provider).then(res => {
        resolve(res);
        this.snackBar.open('You are in!', 'Have fun :D', { duration: 2000 });
        this.router.navigate(['/home']);
        this.isLogin = true;
        // tslint:disable-next-line:no-shadowed-variable
      }).catch((err) => {
        this.snackBar.open(err, 'Please try again.', { duration: 2000 });
        this.isLogin = false;
      });
    });
  }

  async signInManually() {
    await this.afAuth.signInWithEmailAndPassword(this.email.value, this.password.value).then(
      () => {
        this.snackBar.open('Congratulations', '', { duration: 2000 });
        location.href = '/';
      }, err => {
        this.snackBar.open(err.message, '', { duration: 20000 });
      }
    );
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a password' :
      this.password.hasError('minLength') ? 'You password must have 10 characters' :
        '';
  }

}
