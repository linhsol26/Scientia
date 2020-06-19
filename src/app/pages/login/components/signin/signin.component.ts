import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticateService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

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
  isLogin: boolean;
  ngOnInit() {
    this.afAuth.authState.subscribe(usr => {
      this.isLogin = !(usr == null);
    });
  }

  async signIn() {
    await this.authService.signIn(this.email.value, this.password.value).then(
      () => {
        this.snackBar.open('Congratulations', '', { duration: 2000 });
        this.router.navigate(['home']);
      }, err => {
        this.snackBar.open(err, '', { duration: 2000 });
      }
    );
  }

  async gg() {
    await this.authService.loginWithGoogle().then(
      () => {
        this.snackBar.open('You are in!', 'Have fun :D', { duration: 2000 });
        this.router.navigate(['home']);
      }, err => {
        this.snackBar.open(err, '', { duration: 2000 });
      }
    );
  }

  async fb() {
    await this.authService.signInWithFB().then(
      () => {
        this.snackBar.open('You are in!', 'Have fun :D', { duration: 2000 });
        this.router.navigate(['home']);
      }, err => {
        this.snackBar.open(err, '', { duration: 2000 });
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
