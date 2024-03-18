import { Injectable } from '@angular/core';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }
  posts: Post[] = [
    new Post("wiwawiwawiwawiwawiwawiwawiwawiwa","","","",{cosmo: true, fb: false}),
    new Post("wiwa","","","",{cosmo: true, fb: false}),
    new Post("wiwa","","","",{cosmo: true, fb: false}),
    new Post("wiwa","","","",{cosmo: true, fb: false}),
    new Post("wiwa","","","",{cosmo: true, fb: false}),
    new Post("wiwa","","","",{cosmo: true, fb: false}),
    new Post("wiwa","","","",{cosmo: true, fb: false}),
    new Post("wiwa","","","",{cosmo: true, fb: false}),
    new Post("wiwa","","","",{cosmo: true, fb: false})
  ];

  editPost(post: Post){
    console.log('edit');
  }

  delPost(post: Post){
    const index: number = this.posts.findIndex((e) => e.title == post.title);
    this.posts.splice(index, 1);
  }
}
