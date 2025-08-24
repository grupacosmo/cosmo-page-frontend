import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsCardDetails } from 'src/app/shared/models/projects-card-details.model';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { TabsComponent } from '../../../../shared/components/tabs/tabs.component';
import { TabComponent } from '../../../../shared/components/tabs/tab/tab.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    imports: [TabsComponent, TabComponent, NgFor, ProjectCardComponent, AsyncPipe, TranslatePipe]
})
export class ProjectsComponent implements OnInit {

  private readonly projectsService = inject(ProjectsService);

  protected projects$!: Observable<ProjectsCardDetails>;

  ngOnInit(): void {
    this.projects$ = this.projectsService.getProjectsCardDetails();
  }
}
