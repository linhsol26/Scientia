import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'angularx-social-login';
import { map } from 'rxjs/operators';

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
  }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map<firebase.User, boolean>((user) => {
        if (user) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
