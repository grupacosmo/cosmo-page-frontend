import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectItem } from 'src/app/shared/models/project-item.model';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  private readonly projectService = inject(ProjectsService);

  protected projects$!: Observable<ProjectItem[]>;

  protected text = {
    title: 'Projekty',
    allProjects: 'Wszystkie projekty'
  }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }
}
