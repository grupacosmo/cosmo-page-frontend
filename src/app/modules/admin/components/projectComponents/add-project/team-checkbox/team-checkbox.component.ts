import { Component, Input } from '@angular/core';
import { TeamCheckbox } from './TeamCheckbox.model';
import { FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-team-checkbox',
    templateUrl: './team-checkbox.component.html',
    styleUrl: './team-checkbox.component.scss',
    imports: [ReactiveFormsModule]
})

export class TeamCheckboxComponent {
  @Input() teamObject: TeamCheckbox | undefined;
  @Input() formArr!: FormArray;
  @Input() index!: number;
}
