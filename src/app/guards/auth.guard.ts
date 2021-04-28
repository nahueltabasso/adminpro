import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UrlSegment } from '@angular/router/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.authService.validarToken().pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
            
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    return this.authService.validarToken().pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  
}
