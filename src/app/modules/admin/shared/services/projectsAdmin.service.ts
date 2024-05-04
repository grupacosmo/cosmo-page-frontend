import { Injectable, inject } from "@angular/core";
import { ProjectDetailsItem } from "src/app/shared/models/project-details-item";
import { ProjectsService } from "src/app/shared/services/projects.service";

@Injectable({
    providedIn: 'root'
})

export class ProjectsAdminService {
    private service = inject(ProjectsService);
    public projects: ProjectDetailsItem[] = [];
    constructor(){}

    getProjectsFromServer(){

    }
}