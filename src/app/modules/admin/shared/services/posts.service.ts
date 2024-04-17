import { Injectable, inject } from '@angular/core';
import { Post } from '../models/post.model';
import { NewsItem, NewsService } from 'src/app/shared/services/news.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private service = inject(NewsService);
  public posts: Post[] = [];
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
        return newPosts;
      })
    );
  }

  getPosts(){
    return this.posts;
  }

  editPost(post: Post){
    console.log('edit');
  }

  delPost(post: Post){
    const index: number = this.posts.findIndex((e) => e.title == post.title);
    this.posts.splice(index, 1);
  }
}
