import { Injectable, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ProjectDetailsItem } from "src/app/shared/models/project-details-item";
import { ProjectsService } from "src/app/shared/services/projects.service";

@Injectable({
    providedIn: 'root'
})

export class ProjectsAdminService {
    private service = inject(ProjectsService);
    public projects: ProjectDetailsItem[] = [];
    constructor(){}

    addProject(data: any){
        console.log(data)
        let project: ProjectDetailsItem = {
            id: this.projects.length.toString(),
            title: data.title,
            shortDescrpiton: data.shortDesc,
            teams: data.teams,
            date: "12-12-2024",
            teamPhoto: data.teamPhoto,
            status: data.isActive,
            site: "site",
            siteUrl: "siteurl",
            mainPhoto: data.string,
            mainPhotoDescription: data.teamPhotoDesc,
            description: data.projectDesc,
            experimentDescription: data.experimentDesc,
            photos: data.photos,
            photosDescriptions: data.photosDesc,
        }
        this.projects.push(project)
        console.log(this.projects)
    }
}