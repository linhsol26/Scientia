import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  usr: Array<any> = [];
  displayedColumns = ['index', 'displayName', 'email', 'id', 'photoURL'];
  constructor(
    public authService: AuthenticateService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    // this.user = this.authService.user;
    this.userService.query().subscribe(v => {
      this.usr = v.map(i => {
        return {
          index: v.indexOf(i),
          id: i.payload.doc.id,
          ...(i.payload.doc.data() as User)
        };
      });
    });
    console.log(this.usr);
  }

}
