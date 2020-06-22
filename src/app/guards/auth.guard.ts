import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLogin: boolean;
  isLoginFB: boolean;
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
  ) {
    this.afAuth.authState.subscribe(usr => {
      this.isLogin = !(usr == null);
    });

    this.authService.authState.subscribe(urs => {
      this.isLoginFB = !(urs == null);
    });
  }

  // tslint:disable-next-line:max-line-length
  canActivate(): boolean {
    if (this.isLogin || this.isLoginFB) {
      return true;

    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
