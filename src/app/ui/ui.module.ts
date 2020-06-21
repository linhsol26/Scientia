import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, SideNavComponent, SearchBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    SideNavComponent
  ],
  providers: []
})
export class UIModule { }
