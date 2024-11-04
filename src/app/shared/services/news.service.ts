import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostData } from 'src/app/modules/admin/components/postComponents/add-post/add-post.component';
import { HttpService } from './http.service';

export interface NewsItem {
  id: string;
  slug: string;
  title: string,
  content: string;
  date: string;
  imageUrl: string;
} 

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  private http: HttpService = inject(HttpService);
  private readonly apiController: string = 'api';

  constructor() { }

  getNews(): Observable<NewsItem[]> {
    // return this.http.get<NewsItem[]>('');
    return of(fakeNews);
  }

  getBySlug(slug: string): Observable<NewsItem | undefined> {
    return of(fakeNews.find(news => news.slug === slug))
  }

  onPost(news: PostData){
    let id = String(parseInt(fakeNews[fakeNews.length - 1].id) - 1);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    console.log({     
      id: id,
      slug: id,
      title: news.title,
      content: news.text,
      date: currentDate,
      imageUrl: news.attachments[0].file,
    })

    fakeNews.push({
      id: id,
      slug: id,
      title: news.title,
      content: news.text,
      date: currentDate,
      imageUrl: news.attachments[0].file,
    });

    console.log(fakeNews);

    // let updatedNews: NewsItem = {
    //   ...news,
    //   title: news.title,
    //   content: news.text,
    //   imageUrl: news.attachments[0].file,
    // };

    // this.http.post(`${this.apiController}/post`, news);
  }

  onEdit(news: PostData){
    

    // let updatedNews: NewsItem = {
    //   ...news,
    //   title: news.title,
    //   content: news.text,
    //   imageUrl: news.attachments[0].file,
    // };

    // this.http.post(`${this.apiController}/editNewsById`, news);
  }
  
  onDelete(news_id: Number){
    
  }
}

let fakeNews: NewsItem[] = [
  {
    id: '1',
    slug: '1',
    title:'Konferencja SpaceWhatever 2023',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://admin.live.ilo.org/sites/default/files/2023-06/52951700532_df0e3916d9_k.jpg'
  },
  {
    id: '2',
    slug: '2',
    title:'Spotkanie zapoznawcze',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Libya_4608_Idehan_Ubari_Dunes_Luca_Galuzzi_2007.jpg'
  },
  {
    id: '3',
    slug: '3',
    title:'Designerzy go nienawidzą',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Soyuz_TMA-9_launch.jpg'
  },
  {
    id: '4',
    slug: '4',
    title:'Odkrył jeden prosty sposób jak zmieścić długie tytuły w miniaturce artykułów',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/DS_Brothers_in_Arms.jpg'
  },
  {
    id: '5',
    slug: '5',
    title:'Odkrył jeden prosty sposób jak zmieścić długie tytuły w miniaturce artykułów',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/24/MythBusters_title_screen.jpg'
  },
  {
    id: '6',
    slug: '6',
    title:'Samet, consectetur adipiscing elit. Vesti',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://m.media-amazon.com/images/I/818ZIp4Ez3L._UF894,1000_QL80_.jpg'
  },
  {
    id: '7',
    slug: '7',
    title:'Karamba  ale tytul',
    content: 'Lorem ipsum dolor sit amet, conse. Vestuctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/DS_Brothers_in_Arms.jpg'
  },
  {
    id: '11',
    slug: '11',
    title:'Konferencja SpaceWhatever 2023',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://admin.live.ilo.org/sites/default/files/2023-06/52951700532_df0e3916d9_k.jpg'
  },
  {
    id: '12',
    slug: '12',
    title:'Spotkanie zapoznawcze',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Libya_4608_Idehan_Ubari_Dunes_Luca_Galuzzi_2007.jpg'
  },
  {
    id: '13',
    slug: '13',
    title:'Designerzy go nienawidzą',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Soyuz_TMA-9_launch.jpg'
  },
  {
    id: '14',
    slug: '14',
    title:'Odkrył jeden prosty sposób jak zmieścić długie tytuły w miniaturce artykułów',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/DS_Brothers_in_Arms.jpg'
  },
  {
    id: '15',
    slug: '15',
    title:'Odkrył jeden prosty sposób jak zmieścić długie tytuły w miniaturce artykułów',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/24/MythBusters_title_screen.jpg'
  },
  {
    id: '16',
    slug: '16',
    title:'Samet, consectetur adipiscing elit. Vesti',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet ornare mauris. Cras semper, ligula ac feugiat euismod, lorem dui dapibus sapien, eu interdum dui mauris ac odio. Vestibulum vehicula justo vel nunc mattis auctor. Aliquam vel mauris nec augue pellentesque ',
  date: '12.12.2021',
    imageUrl: 'https://m.media-amazon.com/images/I/818ZIp4Ez3L._UF894,1000_QL80_.jpg'
  },
  {
    id: '17',
    slug: '17',
    title:'Karamba  ale tytul',
    content: 'Lorem ipsum dolor sit amet, conse. Vestuctor. Aliquam vel mauris nec augue pellentesque ',
    date: '12.12.2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/DS_Brothers_in_Arms.jpg'
  },
]
