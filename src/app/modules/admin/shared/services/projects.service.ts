import { Injectable, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { ProjectDetailsItem } from "src/app/shared/models/project-details-item";
import { ProjectsService } from "src/app/shared/services/projects.service";

@Injectable({
    providedIn: 'root'
})

export class ProjectsAdminService {
    editProject(project: ProjectDetailsItem) {
      throw new Error('Method not implemented.');
    }
    private service = inject(ProjectsService);
    constructor(){}

    addProject(data: any){
        this.service.getProjectsWithDetails().subscribe((projects) => {
            const projectLength = projects.length.toString();
            
            let project: ProjectDetailsItem = {
              id: projectLength,
              title: data.title,
              shortDescrpiton: data.shortDesc,
              teams: data.teams,
              date: "12-12-2024",
              teamPhoto: data.teamPhoto,
              status: data.isActive,
              site: "site",
              siteUrl: "siteurl",
              mainPhoto: data.mainPhoto,
              mainPhotoDescription: data.teamPhotoDesc,
              description: data.projectDesc,
              experimentDescription: data.experimentDesc,
              photos: data.photos,
              photosDescriptions: data.photosDesc,
            };
      
            this.service.addProjectWithDetails(project);
          });
    }

    getProjectsFromServer(){ //Observable<ProjectDetailsItem[]>
        return this.service.getProjectsWithDetails();
    }

    deleteProject(project: ProjectDetailsItem) {
        this.service.deleteProjectWithDetails(project.id);
    }
}