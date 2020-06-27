import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(20)
        ]),
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

    get name() {return this.formGroup.get('name'); }
    get email() { return this.formGroup.get('email'); }
    get password() { return this.formGroup.get('password'); }
    get confirmPassword() { return this.formGroup.get('confirmPassword'); }

  ngOnInit() {

  }
  async signUp() {
    if (this.email != null && this.password != null && this.confirmPassword != null
      && this.confirmPassword.value === this.password.value && this.name.value != null) {
        await this.authService.signUp(this.email.value, this.password.value, this.name.value).then(
        () => {
          this.router.navigate(['home']);
          this.snackBar.open('Welcome to my site', '', { duration: 2000 });
        }, err => {
          this.snackBar.open(err, '', { duration: 2000 });
        }
      );
    } else {
      this.snackBar.open('Yours confirm password was not correct', '', { duration: 2000 });
    }
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
