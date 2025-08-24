import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectItem } from 'src/app/shared/models/project-item.model';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { CustomButtonComponent } from '../../../../shared/controls/custom-button/custom-button.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-projects-home',
    templateUrl: './projects-home.component.html',
    styleUrl: './projects-home.component.scss',
    imports: [CustomButtonComponent, RouterLink, AsyncPipe, TranslatePipe]
})
export class ProjectsHomeComponent implements OnInit {

  private readonly projectService = inject(ProjectsService);

  protected projects$!: Observable<ProjectItem[]>;

  readonly text = {
    title: 'navigation.projects',
    allProjects: 'projects.allProjects',
  }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }
}
