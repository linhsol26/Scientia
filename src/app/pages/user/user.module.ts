import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
// tslint:disable-next-line:max-line-length
import { MatAutocompleteModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class UserModule { }
