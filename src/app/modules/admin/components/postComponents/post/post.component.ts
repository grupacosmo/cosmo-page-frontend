import { Component, Input, inject, input } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../../edit-dialogs/edit-post-dialog/edit-post-dialog.component';
import { PostItem } from 'src/app/shared/interfaces/PostInterfaces';
@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    standalone: false
})

export class PostComponent {
  readonly post = input.required<PostItem>({alias: 'newsItem'});
  managerService = inject(PostsService);
  constructor(public dialog: MatDialog){}

  openDialog(post: PostItem): void {
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

  editPost(post: PostItem): void{
    this.openDialog(post);
  }
}
