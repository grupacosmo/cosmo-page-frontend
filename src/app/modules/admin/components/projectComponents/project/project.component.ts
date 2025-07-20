import { Component, Input, inject } from '@angular/core';
import { ProjectDetailsItem } from 'src/app/shared/models/project-details-item';
import { ProjectsAdminService } from '../../../shared/services/projects.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    standalone: false
})
export class ProjectComponent {
  @Input() project!: ProjectDetailsItem;
  service = inject(ProjectsAdminService);

  editProject() {
    this.service.editProject(this.project);
  }

  deleteProject() {
    this.service.deleteProject(this.project);
  }
}
