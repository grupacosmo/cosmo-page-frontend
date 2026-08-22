import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../shared/services/posts.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf, NgFor, CommonModule } from '@angular/common';

interface UploadedFile {
  preview: string,
  file: any,
}

export interface PostData {
  title: string,
  text?: string,
  id?: string,
}

@Component({
    selector: 'app-post-edit-dialog',
    templateUrl: './edit-post-dialog.component.html',
    styleUrl: './edit-post-dialog.component.scss',
    imports: [MatDialogContent, ReactiveFormsModule, NgIf, NgFor, CommonModule, MatSnackBarModule],
    standalone: true
})

export class EditPostDialogComponent {
    readonly dialogRef = inject(MatDialogRef<EditPostDialogComponent>);
    readonly data = inject<PostData>(MAT_DIALOG_DATA);
    editPostForm: FormGroup;
    @ViewChild('attachments') attachment: any;
    private service = inject(PostsService);
    private snackBar = inject(MatSnackBar);
    selectedFiles?: FileList;
    previews: UploadedFile[] = [];

    constructor(private fb: FormBuilder){
      this.editPostForm = this.fb.group({
        title: [this.data?.title || '', Validators.required],
        text: [this.data?.text || '', Validators.required],
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    showPreview(event: any){
      this.previews = [];
      this.selectedFiles = event.target.files;

      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;

        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();
          const file = this.selectedFiles![i];

          reader.onload = (event: any) => {
            const preview = event.target.result;
            this.previews.push({preview, file});
          };

          reader.readAsDataURL(file);
        }
      }
    }

    onEdit(): void {
      if (!this.editPostForm.valid) {
        return;
      }

      const formValue = this.editPostForm.value;
      const postData = {
        title: formValue.title,
        description: formValue.text,
      };

      const postId = this.data.id || '';

      this.service.getNewsService().onEdit(postId, postData).subscribe({
        next: () => {
          this.snackBar.open('✓ Post updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error editing post:', error);
          this.snackBar.open('✗ Failed to update post', 'Close', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
      });
    }

    onDelete(fileName: string) {
      const index: number = this.previews.findIndex((preview) => preview.file.name === fileName);
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

    trackByFn(index: number, item: any): number {
      return index;
    }
}
