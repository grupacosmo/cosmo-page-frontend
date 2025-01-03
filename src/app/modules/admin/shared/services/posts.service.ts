import { Injectable, inject } from '@angular/core';
import { Post } from '../models/post.model';
import { NewsItem, NewsService } from 'src/app/shared/services/news.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  private service = inject(NewsService);
  private posts: Post[] = [];
  constructor() { }

  getPostsFromServer(): Observable<Post[]> {
    return this.service.getNews().pipe(
      map((newsItems: NewsItem[]) => {
        const newPosts = newsItems.map(newsItem => new Post(
          newsItem.title,
          '',
          newsItem.imageUrl,
          newsItem.content,
          { cosmo: false, fb: false }
        ));
        this.posts = newPosts;
        console.log(newPosts);
        return newPosts;
      })
    );
  }

  getPosts(){
    return this.posts;
  }

  editPost(post: Post){
    //edytowanko
  }

  delPost(post: Post){
    const index: number = this.posts.findIndex((e) => e.title == post.title);
    this.posts.splice(index, 1);
  }

  getNewsService(){
    return this.service;
  }
}
