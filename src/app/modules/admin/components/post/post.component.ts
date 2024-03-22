import { Component, Input } from '@angular/core';
import { Post } from '../../post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  constructor(private service: PostsService){}
  manager = this.service;
  @Input() post: Post = new Post("", "", "", "", {cosmo: false, fb: false});
}
