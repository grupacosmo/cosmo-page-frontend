import { Component, inject } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';
import { Post } from '../../../shared/models/post.model';
import { NgFor } from '@angular/common';
import { PostComponent } from '../post/post.component';

@Component({
    selector: 'app-posts-man',
    templateUrl: './posts-man.component.html',
    styleUrl: './posts-man.component.scss',
    imports: [NgFor, PostComponent]
})

export class PostsManComponent {
  private service = inject(PostsService);
  public posts: Post[] = [];

  constructor(){}

  ngOnInit(){
    this.service.getPostsFromServer().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
