import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CrudCoursesService } from 'src/app/services/crud-courses.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchOption = [];
  userList: Array<any> = [];
  courseList: Array<any> = [];
  data: any;
  myControl = new FormControl();
  filteredOptions$: Observable<string[]>;

  constructor(
    public userService: UserService,
    public crudService: CrudCoursesService
  ) { }

  ngOnInit(): void {
    this.userList = this.userService.user;
    this.courseList = this.crudService.datas;
    this.data = this.userList.concat(this.courseList);
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterValue(value))
    );
  }

  private filterValue(value: string): string[] {
    const filterV = this.normalizeValue(value);
    return this.data.filter(v => this.normalizeValue(v).includes(filterV));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
