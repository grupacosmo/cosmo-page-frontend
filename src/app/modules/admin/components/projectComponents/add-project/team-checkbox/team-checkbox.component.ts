import { Component, Input } from '@angular/core';
import { TeamCheckbox } from './TeamCheckbox.model';

@Component({
  selector: 'app-team-checkbox',
  templateUrl: './team-checkbox.component.html',
  styleUrl: './team-checkbox.component.scss'
})

export class TeamCheckboxComponent {
  @Input() teamObject: TeamCheckbox | undefined;
}
