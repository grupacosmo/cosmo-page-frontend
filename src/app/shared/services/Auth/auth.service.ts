import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { AuthResult } from '../../interfaces/AuthInterfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api: AuthApiService = inject(AuthApiService);
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  authenticate(token: string): Observable<any> {
    return this.api.authenticate(token).pipe(tap((authenticated: AuthResult) => {
      authenticated.isAuthenticated ? this.isAuthenticated.next(true) : this.isAuthenticated.next(false);
    }));
  }
}
