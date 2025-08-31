import { Component, ViewChild, inject } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Image, PostInterface } from 'src/app/shared/interfaces/PostInterfaces';
import { NewsService } from 'src/app/shared/services/news.service';
import { PostMapperService } from '../../../shared/services/posts-mapper.service';
import { ImageService } from 'src/app/shared/services/images.service';
import { ImageUploaded } from 'src/app/shared/interfaces/ImageInterface';
import { forkJoin, Observable } from 'rxjs';

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

export interface MapFormResult {
  postData: PostInterface;
  imageList?: FileList;
}

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrl: './add-post.component.scss',
    standalone: false
})

export class AddPostComponent {
  @ViewChild('attachments') attachment: any;
  private newsService = inject(NewsService);
  private imageService = inject(ImageService);
  private postMapperService = inject(PostMapperService);
  protected postForm: FormGroup;
  public path: string = "../../../../../assets/";
  selectedFiles?: FileList;
  previews: UploadedFile[] = [];

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      text: ['', Validators.required],
      // platforms: this.fb.array([
      //   this.fb.control(false),
      //   this.fb.control(false)
      // ])
    });
  }

  showPreview(event: any) {
    this.previews = [];
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const filesArray = Array.from(this.selectedFiles);
      const observables = filesArray.map(file => this.fileToBase64(file));

      forkJoin(observables).subscribe({
        next: (base64Array: string[]) => {
          base64Array.forEach((preview, index) => {
            this.previews.push({ preview, file: filesArray[index] });
          });
        },
        error: (err) => console.error('Error converting files:', err)
      });
    }
  }

onPost(): void {
  if (this.postForm.invalid) {
    return;
  }

  const result: MapFormResult = this.postMapperService.mapFormToPost(this.postForm.value, this.selectedFiles);
  const { postData, imageList } = result;

  if (imageList && imageList.length > 0) {
    this.imageService.addImages(imageList).subscribe({
      next: (imageUrls: ImageUploaded[]) => {
        const imagesForPost = imageUrls.map(img => ({
          id: img.id,
          name: null,
          type: null,
          data: null
        }))

        // Tutaj przypisujemy pełne obiekty Image do posta
        postData.images.push(...imagesForPost);

        // Wysyłamy post do backendu
        this.newsService.addPost(postData).subscribe({
          next: () => this.postForm.reset(),
          error: (err) => console.error('Error adding post:', err)
        });
      },
      error: (err) => console.error('Error uploading images:', err)
    });
  } else {
    this.newsService.addPost(postData).subscribe({
      next: () => this.postForm.reset(),
      error: (err) => console.error('Error adding post:', err)
    });
  }
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


  fileToBase64(file: File): Observable<string> {
    return new Observable<string>(observer => {
      const reader = new FileReader();

      reader.onload = () => {
        observer.next(reader.result as string);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error('Error converting file to base64');
      };

      reader.readAsDataURL(file);
      return () => reader.abort();
    });
  }
}

