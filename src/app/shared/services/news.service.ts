import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { IPostsResponse, PostDetails } from '../interfaces/PostInterfaces';

interface PagingParams {
  page?: number,
  size?: number
}

const DefaultParams: PagingParams = {
  page: 0,
  size: 10
}

export interface PostPayload {
  title: string,
  description: string,
}

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  private http: HttpService = inject(HttpService);
  private readonly apiController: string = 'api/posts';

  constructor() { }

  getNews(pagingParams: PagingParams = {}): Observable<IPostsResponse> {
    const params = {
      ...DefaultParams,
      ...pagingParams
    }

    const url = this.apiController + `?page=${params.page}&size=${params.size}`;
    return this.http.get<IPostsResponse>(url)
  }

  getBySlug(id: string): Observable<PostDetails | string>  {
    const url = this.apiController + '/' + id;
    return this.http.get<PostDetails>(url)
  }

  onPost(news: PostPayload): Observable<any> {
    return this.http.post(this.apiController, news);
  }

  onEdit(postId: string, news: PostPayload): Observable<any> {
    return this.http.put(`${this.apiController}/${postId}`, news);
  }

  onDelete(postId: string): Observable<any> {
    return this.http.delete(`${this.apiController}/${postId}`);
  }
}
