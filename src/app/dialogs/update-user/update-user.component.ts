import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  formGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
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

    get name() {return this.formGroup.get('name'); }
    get password() { return this.formGroup.get('password'); }
    get confirmPassword() { return this.formGroup.get('confirmPassword'); }

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  save() {
    if (this.password.value === this.confirmPassword.value) {
      this.dialogRef.close({
        displayName: this.name.value,
        password: this.password.value
      });
    } else {
      this.snackBar.open('Something wrong please try again!', '', {duration: 2000});
    }
  }
}
