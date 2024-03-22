import { Component } from '@angular/core';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-posts-man',
  templateUrl: './posts-man.component.html',
  styleUrl: './posts-man.component.scss',
})
export class PostsManComponent {
  constructor(private service: PostsService){}
  posts = this.service.posts;
}
