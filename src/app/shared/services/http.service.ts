import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthResult } from '../interfaces/AuthInterfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  get apiUrl(): string | undefined {
    return "http://localhost:3000";
  }

  private http: HttpClient = inject(HttpClient);
  constructor() { }

  get(endpoint: string, options?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, options);
  }

  post(endpoint: string, data: any, options?: any): Observable<any>{
    // return this.http.post(`${this.apiUrl}/${endpoint}`, data, options).pipe(
    //   catchError(error => {
    //     console.error('Error occurred:', error);
    //     return throwError('Something went wrong!');
    //   })
    // );
    return of<AuthResult>({
      message: 'Login successful',
      isAuthenticated: true
    });
  }
}
