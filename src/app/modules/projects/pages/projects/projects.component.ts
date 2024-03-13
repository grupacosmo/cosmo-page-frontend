import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsCardDetails, ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {

  private readonly projectsService = inject(ProjectsService);

  protected projects$!: Observable<ProjectsCardDetails>;

  ngOnInit(): void {
    this.projects$ = this.projectsService.getProjectsCardDetails();
  }
}
