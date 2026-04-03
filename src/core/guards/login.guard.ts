import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      // already logged in → go to dashboard
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
