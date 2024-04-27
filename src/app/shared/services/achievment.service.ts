import { Injectable } from '@angular/core';
import { AchievmentItem } from '../models/achievments';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AchievmentService {

  constructor(private http: HttpClient) { }

  getAchievments(): Observable<AchievmentItem[]> {
    // return this.http.get<ProjectItem[]>('');
    return of(achievments);
  }
}

const achievments: AchievmentItem[] = [
  {
    id: 1,
    title: "Achievment title 1",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed, 
    rhoncus cursus dui. In non luctus ante. Aliquam vitae arcu euismod, volutpat erat nec,
    pulvinar ligula. Fusce purus elit, varius eu ne`,
    date: '2024/02/02',
    icon: 'rocket'
  },
  {
    id: 2,
    title: "Achievment title 2",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed, 
    rhoncus cursus dui. In non luctus ante. Aliquam vitae arcu euismod, volutpat erat nec,
    pulvinar ligula. Fusce purus elit, varius eu ne`,
    date: '2024/02/02',
    icon: 'rocket'
  },
  {
    id: 3,
    title: "Achievment title 3",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed, 
    rhoncus cursus dui. In non luctus ante. Aliquam vitae arcu euismod, volutpat erat nec,
    pulvinar ligula. Fusce purus elit, varius eu ne`,
    date: '2024/02/02',
    icon: 'rocket'
  },
  {
    id: 4,
    title: "Achievment title 4",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed, 
    rhoncus cursus dui. In non luctus ante. Aliquam vitae arcu euismod, volutpat erat nec,
    pulvinar ligula. Fusce purus elit, varius eu ne`,
    date: '2024/02/02',
    icon: 'rocket'
  },
  {
    id: 5,
    title: "Achievment title 1",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed, 
    rhoncus cursus dui. In non luctus ante. Aliquam vitae arcu euismod, volutpat erat nec,
    pulvinar ligula. Fusce purus elit, varius eu ne`,
    date: '2024/02/02',
    icon: 'rocket'
  }
]
