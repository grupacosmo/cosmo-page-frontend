import { Injectable, inject } from '@angular/core';
import { Post } from '../models/post.model';
import { NewsService } from 'src/app/shared/services/news.service';
import { Observable, map } from 'rxjs';
import { IPostsResponse, PostItem } from 'src/app/shared/interfaces/PostInterfaces';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  private service = inject(NewsService);
  private posts: Post[] = [];
  constructor() { }

  getPostsFromServer(): Observable<Post[]> {
    return this.service.getNews().pipe(
      map((response: IPostsResponse) => response.content),
      map((newsItems: PostItem[]) => {
        const newPosts = newsItems.map(newsItem => new Post(
          newsItem.title ?? '',
          '',
          newsItem.backgroundPhoto?.src ?? '',
          newsItem.description,
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
