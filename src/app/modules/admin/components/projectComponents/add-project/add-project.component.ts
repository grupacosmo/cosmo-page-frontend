import { Component, ViewChild } from '@angular/core';
import { TeamsService } from '../../../shared/services/teams.service';
import { TeamCheckbox } from './team-checkbox/TeamCheckbox.model';
import { FormArray, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectsAdminService } from '../../../shared/services/projects.service';
import { NgFor } from '@angular/common';

type UploadedFile =  {
  preview: string,
  file: any,
}

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrl: './add-project.component.scss',
    imports: [ReactiveFormsModule, NgFor]
})
export class AddProjectComponent {
  @ViewChild('attachments') attachment: any;

  projectForm: any;
  teams: TeamCheckbox[] = this.service.teams;
  selectedFiles?: FileList;
  previews: UploadedFile[] = [];

  constructor(private service: TeamsService, private formBuilder: FormBuilder, private projectService: ProjectsAdminService){}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title: [''],
      shortDesc: [''],
      titlePhoto: [''],
      titlePhotoDesc: [''],
      teams: this.formBuilder.array([]),
      teamPhoto: [''],
      teamPhotoDesc: [''],
      isActive: [false],
      projectDesc: [''],
      experimentDesc: [''],
      photos: this.formBuilder.array([]),
      photosDesc: this.formBuilder.array([]),
    });

    this.addTeamsCheckboxes();
    this.addPhotosDesc();
  }

  addTeamsCheckboxes() {
    this.teams.forEach(()=>{
      this.getTeamsFormArray().push(this.formBuilder.control(false))
    })
  }

  getTeamsFormArray(): FormArray{
    return this.projectForm.get("teams") as FormArray;
  }

  addPhotosDesc(){
    this.getPhotosFormArray().push(this.formBuilder.control(false))
  }

  getPhotosFormArray(): FormArray{
    return this.projectForm.get("photosDesc") as FormArray;
  }

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

  onPost() {
    if (this.projectForm) {
      console.log(this.projectForm)
      this.projectService.addProject(this.projectForm.value);
    }
  }
}
