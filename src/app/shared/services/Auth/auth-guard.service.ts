import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResult } from '../../interfaces/AuthInterfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private isAuthenticated: boolean = false;

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      this.auth.authenticate(localStorage["token"]).subscribe((AuthResult: AuthResult) => {
        if(AuthResult.isAuthenticated){
          this.isAuthenticated = true;
          resolve(true);
        }
        else{
          this.router.navigate(['/verify']);
          this.isAuthenticated = false;
          resolve(false);
        }
      }) 
    });
  }
}
