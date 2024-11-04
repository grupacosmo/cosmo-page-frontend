import { Component, Input, inject } from '@angular/core';
import { Post } from '../../../shared/models/post.model';
import { PostsService } from '../../../shared/services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../../edit-dialogs/edit-post-dialog/edit-post-dialog.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent {
  @Input() post: Post = new Post("", "", "", "", {cosmo: false, fb: false});
  managerService = inject(PostsService);
  constructor(public dialog: MatDialog){}

  openDialog(post: Post): void {
    console.log("AAa")
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      height: '100%',
      width: '100%',
      data: post,
      backdropClass: 'custom-backdrop',
      panelClass: 'custom-dialog-panel',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editPost(post: Post): void{
    this.openDialog(post);
  }
}
