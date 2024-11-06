import { Component, inject } from '@angular/core';
import { ProjectDetailsItem } from 'src/app/shared/models/project-details-item';
import { ProjectsAdminService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-projects-man',
  templateUrl: './projects-man.component.html',
  styleUrl: './projects-man.component.scss'
})
export class ProjectsManComponent {
  private service = inject(ProjectsAdminService);
  private projects: ProjectDetailsItem[] = [];

  ngOnInit(){
    this.service.getProjectsFromServer().subscribe(projects => this.projects = projects);
  }

  getProjects(){
    return this.projects;
  }
}
