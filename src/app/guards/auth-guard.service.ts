import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isLogin = false;
  redirectUrl: string;
  constructor() { }
}
