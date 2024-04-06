import { Component, Input } from '@angular/core';
import { ProjectCardInfo } from '../../models/project-card-info.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input()
  project!: ProjectCardInfo;
}
