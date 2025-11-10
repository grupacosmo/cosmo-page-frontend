import { Component, inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../shared/services/posts.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf, NgFor } from '@angular/common';


interface UploadedFile {
  preview: string,
  file: any,
}

export interface PostData {
  title: string,
  author: string,
  attachments: UploadedFile[],
  text: string,
  platforms: any,
}

@Component({
    selector: 'app-post-edit-dialog',
    templateUrl: './edit-post-dialog.component.html',
    styleUrl: './edit-post-dialog.component.scss',
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, ReactiveFormsModule, NgIf, NgFor, MatDialogActions]
})

export class EditPostDialogComponent {
    readonly dialogRef = inject(MatDialogRef<EditPostDialogComponent>);
    readonly data = inject<PostData>(MAT_DIALOG_DATA);
    editPostForm: FormGroup;
    @ViewChild('attachments') attachment: any;
    private service = inject(PostsService);
    public path: string = "../../../../../assets/";
    selectedFiles?: FileList;
    previews: UploadedFile[] = [];

    constructor(private fb: FormBuilder){
      this.editPostForm = this.fb.group({
        title: [this.data.title, Validators.required],
        author: [this.data.author, Validators.required],
        attachments: [this.data.attachments],
        text: [this.data.attachments, Validators.required],
        platforms: this.fb.array(
          Array.isArray(this.data.platforms) ? this.data.platforms.map(platform => this.fb.control(platform)) : [this.fb.control(false), this.fb.control(false)]
        ),
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
      const formValue = this.editPostForm.value;
      const postData = {
        id: '',
        slug: '',
        date: '',
        title: formValue.title,
        author: formValue.author,
        text: formValue.text,
        platforms: formValue.platforms,
        attachments: this.previews.map(p => p.file)
      };
  
      console.log('Post Data:', postData);
      console.log("Sent");
      this.service.getNewsService().onEdit(postData);
      this.dialogRef.close();
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
  
    getPlatforms(): FormArray {
      return this.editPostForm.get('platforms') as FormArray;
    }
  
    onCheckboxChange(index: number, event: any) {
      const platforms = this.getPlatforms();
      if (event.target.checked) {
        platforms.at(index).setValue(true);
      } else {
        platforms.at(index).setValue(false);
      }
      platforms.updateValueAndValidity();
    }
  
    trackByFn(index: number, item: any): number {
      return index;
    }
}
