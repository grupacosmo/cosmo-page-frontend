import { Component, ViewChild } from '@angular/core';
import { TeamsService } from '../../../services/teams.service';
import { TeamCheckbox } from './team-checkbox/TeamCheckbox.model';

type UploadedFile =  {
  preview: string,
  file: any,
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
  constructor(private service: TeamsService){}

  teams: TeamCheckbox[] = this.service.teams;

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

        reader.onload = (event: any) => {
          this.previews.push({preview: event.target.result, file: this.selectedFiles![i]});
        };
        
        reader.readAsDataURL(this.selectedFiles[i]);
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
