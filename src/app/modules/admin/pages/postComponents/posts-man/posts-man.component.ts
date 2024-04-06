import { Component, inject } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';

@Component({
  selector: 'app-posts-man',
  templateUrl: './posts-man.component.html',
  styleUrl: './posts-man.component.scss',
})
export class PostsManComponent {
  private service = inject(PostsService);
  posts = this.service.posts;
  constructor(){}
}
