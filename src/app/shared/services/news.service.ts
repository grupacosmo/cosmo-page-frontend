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
    title:'Konferencja SpaceWhatever 2023',
    content: '',
    date: '12.12.2021',
    imageUrl: 'https://admin.live.ilo.org/sites/default/files/2023-06/52951700532_df0e3916d9_k.jpg'
  },
  {
    id: '2',
    title:'Spotkanie zapoznawcze',
    content: '',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Libya_4608_Idehan_Ubari_Dunes_Luca_Galuzzi_2007.jpg'
  },
  {
    id: '3',
    title:'Designerzy go nienawidzą',
    content: '',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Soyuz_TMA-9_launch.jpg'
  },
  {
    id: '4',
    title:'Odkrył jeden prosty sposób jak zmieścić długie tytuły w miniaturce artykułów',
    content: '',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/DS_Brothers_in_Arms.jpg'
  },
]
