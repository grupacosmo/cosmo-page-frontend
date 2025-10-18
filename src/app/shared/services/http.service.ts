import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API_KEY, API_URL } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);

  private httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
    'apiKey': API_KEY,
    })
  }

  get<T>(endpoint: string, options: any = {}): Observable<T> {
    return this.http.get<T>(`${API_URL}/${endpoint}`, { ...this.httpOptions });
  }

  post(endpoint: string, data: any, options?: any): Observable<any>{
    return this.http.post(`${API_URL}/${endpoint}`, data, { ...this.httpOptions }).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError('Something went wrong!');
      })
    );
  }
}
