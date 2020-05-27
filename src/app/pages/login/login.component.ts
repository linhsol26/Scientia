import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required, Validators.minLength(10)]); // gioi han password
  isLogin: boolean;
  constructor() { }

  ngOnInit() {
  }
}
