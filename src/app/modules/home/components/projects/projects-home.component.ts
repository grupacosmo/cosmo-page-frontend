import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectItem } from 'src/app/shared/models/project-item.model';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-projects-home',
  templateUrl: './projects-home.component.html',
  styleUrl: './projects-home.component.scss'
})
export class ProjectsHomeComponent implements OnInit {

  private readonly projectService = inject(ProjectsService);

  protected projects$!: Observable<ProjectItem[]>;

  protected text = {
    title: 'navigation.projects',
    allProjects: 'projects.allProjects',
  }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }
}
