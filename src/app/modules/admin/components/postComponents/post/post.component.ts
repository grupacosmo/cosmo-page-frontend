import { Component, Input, inject } from '@angular/core';
import { Post } from '../../../shared/models/post.model';
import { PostsService } from '../../../shared/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post: Post = new Post("", "", "", "", {cosmo: false, fb: false});
  managerService = inject(PostsService);
  constructor(){}
}
