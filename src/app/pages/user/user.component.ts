import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { User } from 'firebase';
import { AuthenticateService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  constructor(
    public authService: AuthenticateService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

}
