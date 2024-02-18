import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface NewsItem {
  id: string;
  title: string,
  content: string;
  date: string;
  imageUrl: string;
} 

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<NewsItem[]> {
    // return this.http.get<NewsItem[]>('');
    return of(fakeNews);
  }
}

const fakeNews: NewsItem[] = [
  {
    id: '1',
    title:'Title1',
    content: '',
    date: '12/12/12/2021',
    imageUrl: 'https://admin.live.ilo.org/sites/default/files/2023-06/52951700532_df0e3916d9_k.jpg'
  },
  {
    id: '2',
    title:'Title2',
    content: '',
    date: '12/12/12/2021',
    imageUrl: 'https://admin.live.ilo.org/sites/default/files/2023-06/52951700532_df0e3916d9_k.jpg'
  },
  {
    id: '3',
    title:'Title3',
    content: '',
    date: '12/12/12/2021',
    imageUrl: 'https://admin.live.ilo.org/sites/default/files/2023-06/52951700532_df0e3916d9_k.jpg'
  },
  {
    id: '4',
    title:'Title4',
    content: '',
    date: '12/12/12/2021',
    imageUrl: 'https://admin.live.ilo.org/sites/default/files/2023-06/52951700532_df0e3916d9_k.jpg'
  },
]
