import { Component, ViewChild, inject } from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { PostsService } from '../../../shared/services/posts.service';

interface UploadedFile {
  preview: string,
  file: any,
}

export interface PostData {
  id: string,
  slug: string,
  date: string,
  title: string,
  author: string,
  attachments: UploadedFile[],
  text: string,
  platforms: any,
}

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrl: './add-post.component.scss',
    standalone: false
})

export class AddPostComponent {
  @ViewChild('attachments') attachment: any;
  private service = inject(PostsService);
  protected postForm: FormGroup;
  public path: string = "../../../../../assets/";
  selectedFiles?: FileList;
  previews: UploadedFile[] = [];

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      attachments: [''],
      text: ['', Validators.required],
      platforms: this.fb.array([
        this.fb.control(false),
        this.fb.control(false)
      ])
    });
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

  onPost(): void {
    const formValue = this.postForm.value;
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
    this.service.getNewsService().onPost(postData);
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
    return this.postForm.get('platforms') as FormArray;
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

