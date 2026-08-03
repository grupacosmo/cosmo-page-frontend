import { Injectable, inject } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  private service = inject(NewsService);
  constructor() { }

  getNewsService(){
    return this.service;
  }
}
