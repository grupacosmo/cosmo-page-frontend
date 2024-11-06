import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly apiController: string = 'api';
  private http: HttpService = inject(HttpService);
  constructor() { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiController}/login`, credentials);
  }

  authenticate(token: any): Observable<any> {
    return this.http.post(`${this.apiController}/authenticate`, token);
  }
}
