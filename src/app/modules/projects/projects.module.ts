import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class ProjectsModule { }
