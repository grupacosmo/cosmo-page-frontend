import { Component, ViewChild, inject } from '@angular/core';
import { Post } from '../../../shared/models/post.model';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpService } from '../../../../../shared/services/http.service';
import { TranslatePipe } from '../../../../../shared/pipes/translate/translate.pipe';

interface UploadedFile {
  preview: string;
  file: any;
}

export enum PostsManText {
  PageTitle = 'admin.contentManagement',
  RecentPostsTab = 'admin.postsManager.recentPostsTab',
  AddPostTab = 'admin.postsManager.addPostTab',
  SyncIdle = 'admin.postsManager.syncWithFacebook',
  SyncInProgress = 'admin.postsManager.syncing',
  NoPosts = 'admin.postsManager.noPosts',
  TitleLabel = 'admin.postsManager.titleLabel',
  TitlePlaceholder = 'admin.postsManager.titlePlaceholder',
  TextLabel = 'admin.postsManager.textLabel',
  TextPlaceholder = 'admin.postsManager.textPlaceholder',
  AttachmentsLabel = 'admin.postsManager.attachmentsLabel',
  AddedImages = 'admin.postsManager.addedImages',
  RemoveImage = 'admin.postsManager.removeImage',
  PublishIdle = 'admin.postsManager.publish',
  PublishInProgress = 'admin.postsManager.publishing',
}

@Component({
    selector: 'app-posts-man',
    templateUrl: './posts-man.component.html',
    styleUrl: './posts-man.component.scss',
    imports: [CommonModule, PostComponent, ReactiveFormsModule, MatTabsModule, MatSnackBarModule, TranslatePipe]
})

export class PostsManComponent {
  protected readonly PostsManText = PostsManText;
  @ViewChild('attachments') attachment: any;
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpService);
  public posts: Post[] = [];
  public postForm: FormGroup;
  public previews: UploadedFile[] = [];
  public isSubmitting = false;
  public isSyncing = false;
  private selectedFiles?: FileList;

  constructor() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.loadPosts();
  }

  loadPosts(): void {
    this.http.get<any>('api/posts?page=0&size=100').subscribe({
      next: (response) => {
        if (response.content && Array.isArray(response.content)) {
          this.posts = response.content.map((item: any) => new Post(
            item.title || '',
            item.backgroundPhoto?.src || item.image || '',
            item.description || '',
            item.id || ''
          ));
        }
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.snackBar.open('Error loading posts', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  syncFacebookPosts(): void {
    if (this.isSyncing) return;

    this.isSyncing = true;
    this.http.put('api/posts/sync', {}).subscribe({
      next: () => {
        this.snackBar.open('✓ Posty zsynchronizowane z Facebookiem!', 'Close', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.isSyncing = false;
        this.loadPosts();
      },
      error: (error: any) => {
        const errorMsg = error.error?.message || 'Nie udało się zsynchronizować postów';
        this.snackBar.open(`✗ ${errorMsg}`, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.isSyncing = false;
      },
    });
  }

  showPreview(event: any) {
    this.previews = [];
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;

      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        const file = this.selectedFiles![i];

        reader.onload = (event: any) => {
          const preview = event.target.result;
          this.previews.push({ preview, file });
        };

        reader.readAsDataURL(file);
      }
    }
  }

  onPost(): void {
    if (!this.postForm.valid || this.isSubmitting) return;

    this.isSubmitting = true;
    const formValue = this.postForm.value;

    const postData = {
      title: formValue.title,
      description: formValue.text,
    };

    this.http.post('api/posts', postData).subscribe({
      next: (response: any) => {
        this.snackBar.open('✓ Post created successfully!', 'Close', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.resetForm();
        this.isSubmitting = false;
        this.loadPosts();
      },
      error: (error: any) => {
        const errorMsg = error.error?.message || 'Failed to create post';
        this.snackBar.open(`✗ ${errorMsg}`, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.isSubmitting = false;
      },
    });
  }

  onDelete(fileName: string) {
    const index: number = this.previews.findIndex(
      (preview) => preview.file.name === fileName,
    );
    if (index > -1) {
      this.previews.splice(index, 1);

      const dataTransfer = new DataTransfer();

      for (let i = 0; i < this.selectedFiles!.length; i++) {
        if (i !== index) {
          dataTransfer.items.add(this.selectedFiles![i]);
        }
      }

      const newFileList = dataTransfer.files;
      this.attachment.nativeElement.files = newFileList;
      this.selectedFiles = newFileList;
    }
  }

  resetForm(): void {
    this.postForm.reset();
    this.previews = [];
    if (this.attachment) {
      this.attachment.nativeElement.value = '';
    }
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
