// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root', // 👈 IMPORTANT
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     //  WILL UNCOMMENT THE BELOW LINE WHEN DO THE LOGIN SETUP
//     const user = localStorage.getItem('user');
//     // const user = { name: 'neelam' };

//     if (!user) {
//       this.router.navigate(['/login']);
//       return false;
//     }

//     return true;
//   }
// }


import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router) {}

  private isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token'); // ✅ FIXED
    return !!token;
  }

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
