import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectDetailsItem } from 'src/app/shared/models/project-details-item';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { CustomButtonComponent } from '../../../../shared/controls/custom-button/custom-button.component';
import { NgIf, NgFor } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrl: './project-details.component.scss',
    imports: [CustomButtonComponent, RouterLink, NgIf, NgFor, TranslatePipe]
})
export class ProjectDetailsComponent implements OnInit {

  projectId: string | null = null;

  projectDetails: ProjectDetailsItem | null = null;

  teams = '';

  readonly text = {
    backToProjects: 'projects.allProjects',
    description: 'projects.projectDescription',
    experiment: 'common.experiment',
    team: 'common.team',
  }

  private readonly route = inject(ActivatedRoute);

  private readonly projectsService = inject(ProjectsService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('id');
    })
    
    this.projectsService.getProject(this.projectId as string).subscribe((resp) => {
      this.projectDetails = resp;

      this.projectDetails.teams.map((item) => {
        this.teams += item.name + ', ';
      })

      this.teams = this.teams.slice(0, -2);
    })
  }
}
