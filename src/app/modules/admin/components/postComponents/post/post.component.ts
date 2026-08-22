import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../shared/models/post.model';
import { PostsService } from '../../../shared/services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EditPostDialogComponent } from '../../edit-dialogs/edit-post-dialog/edit-post-dialog.component';
@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    standalone: true,
    imports: [CommonModule, MatSnackBarModule]
})

export class PostComponent {
  @Input() post: Post = new Post("", "", "");
  @Output() changed = new EventEmitter<void>();
  managerService = inject(PostsService);
  private snackBar = inject(MatSnackBar);
  constructor(public dialog: MatDialog){}

  openDialog(post: Post): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      data: post,
      backdropClass: 'custom-backdrop',
      panelClass: 'custom-dialog-panel',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changed.emit();
      }
    });
  }

  editPost(post: Post): void{
    this.openDialog(post);
  }

  deletePost(post: Post): void {
    this.managerService.getNewsService().onDelete(post.id).subscribe({
      next: () => {
        this.snackBar.open('✓ Post deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.changed.emit();
      },
      error: (error: any) => {
        console.error('Error deleting post:', error);
        this.snackBar.open('✗ Failed to delete post', 'Close', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
