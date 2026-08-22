import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, API_KEY } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);

  private httpOptions = {
    withCredentials: true,
    headers: API_KEY ? new HttpHeaders({ 'apiKey': API_KEY }) : new HttpHeaders(),
  }

  get<T>(endpoint: string, options: any = {}): Observable<T> {
    return this.http.get<T>(`${API_URL}/${endpoint}`, { ...this.httpOptions });
  }

  post(endpoint: string, data: any, options?: any): Observable<any>{
    return this.http.post(`${API_URL}/${endpoint}`, data, { ...this.httpOptions, ...options });
  }

  put(endpoint: string, data: any, options?: any): Observable<any>{
    return this.http.put(`${API_URL}/${endpoint}`, data, { ...this.httpOptions, ...options });
  }

  delete(endpoint: string, options?: any): Observable<any>{
    return this.http.delete(`${API_URL}/${endpoint}`, { ...this.httpOptions, ...options });
  }
}
