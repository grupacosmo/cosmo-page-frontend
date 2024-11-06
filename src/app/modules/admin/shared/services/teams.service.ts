import { Injectable } from '@angular/core';
import { TeamCheckbox } from '../../components/projectComponents/add-project/team-checkbox/TeamCheckbox.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor() { }
  teams: TeamCheckbox[] = [
    { id: 'team1', name: 'team1', label: 'Team 1', value: 'team1' },
    { id: 'team2', name: 'team2', label: 'Team 2', value: 'team2' },
    { id: 'team3', name: 'team3', label: 'Team 3', value: 'team3' }
  ];
}
