import { Injectable } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLogin = false;
  redirectUrl: string;
  constructor(
    public authService: AuthenticateService,
    public router: Router
  ) { }
  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import('@angular/router').UrlTree | import('rxjs').Observable<boolean | import('@angular/router').UrlTree> | Promise<boolean | import('@angular/router').UrlTree> {
    if (this.authService.isLogin || this.authService.isLoginFB) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }


}
