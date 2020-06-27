import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
// tslint:disable-next-line:max-line-length
import { MatAutocompleteModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TruncateModule } from 'ng2-truncate';
import { ConfirmDeleteComponent } from 'src/app/dialogs/confirm-delete/confirm-delete.component';
import { UpdateUserComponent } from 'src/app/dialogs/update-user/update-user.component';

@NgModule({
  declarations: [UserComponent, UpdateUserComponent],
  entryComponents: [UpdateUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TruncateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
