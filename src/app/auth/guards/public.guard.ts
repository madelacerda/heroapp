import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class PublicGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router ) {
  }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if (isAuthenticated) this.router.navigate( ['./'] )
        } ),
        map( isAuthenticated => !isAuthenticated )
      );
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthStatus();
  }

  canMatch( route: Route, segments: UrlSegment[] ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthStatus();
  }

}
