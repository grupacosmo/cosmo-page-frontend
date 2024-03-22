import { Injectable } from '@angular/core';
import { TeamCheckbox } from '../pages/projectComponents/add-project/team-checkbox/TeamCheckbox.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor() { }
  teams: TeamCheckbox[] = [
    new TeamCheckbox("malinki", "malinki", "ml", "Malinki"),
  ];
}
