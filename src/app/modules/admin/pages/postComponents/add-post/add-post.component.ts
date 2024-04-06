import { Component, ViewChild } from '@angular/core';
import {FormGroup } from "@angular/forms";
import { Observable } from 'rxjs';

type UploadedFile =  {
  preview: string,
  file: any,
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  constructor(){}
  public path: string = "../../../../../assets/";
  selectedFiles?: FileList;
  previews: UploadedFile[] = [];
  @ViewChild('attachments') attachment: any;

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
}
