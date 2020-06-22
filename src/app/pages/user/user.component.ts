import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // data: Array<any> = [];
  // myControl = new FormControl();
  // filteredOptions$: Observable<string[]>;

  constructor(
    public authService: AuthenticateService,
    public userService: UserService
  ) { }
  user: User;
  usr: Array<any> = [];

  displayedColumns = ['index', 'displayName', 'email', 'id', 'photoURL', 'action'];
  dataSource: any;

  ngOnInit(): void {
    this.usr = this.userService.user;
    this.dataSource = new MatTableDataSource(this.usr);
    // this.usr.forEach(v => this.data.push(v.displayName, v.email));
    // this.filteredOptions$ = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this.filterValue(value)),
    // );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // private filterValue(value: string): any[] {
  //   const filterV = this.normalizeValue(value);
  //   return this.data.filter(v => this.normalizeValue(v).includes(filterV));
  // }

  // private normalizeValue(value: string): string {
  //   return value.toLowerCase().replace(/\s/g, '');
  // }
}
