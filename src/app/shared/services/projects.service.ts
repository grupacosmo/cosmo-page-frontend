import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { projectCardInfo } from 'src/app/modules/projects/models/project-card-info.model';
import { ProjectItem } from '../models/project-item.model';
import { ProjectsCardDetails } from '../models/projects-card-details.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ProjectItem[]> {
    // return this.http.get<ProjectItem[]>('');
    return of (dummyProjects);
  }

  getProjectsCardDetails(): Observable<ProjectsCardDetails> {
    return of (dummyCardProjects);
  }
}

const dummyProjects: ProjectItem[] = [
    {
      id: '1',
      title: 'HABSAT',
      url: 'https://futurelab.pk.edu.pl/wp-content/uploads/sites/38/2023/07/habsat-1536x864-1-768x432.jpg'
    },
    {
      id: '2',
      title: 'RAKIETA',
      url: 'https://mrzigod.pl/wp-content/uploads/2022/04/90a-rakieta-760x380.jpg'
    },
    {
      id: '3',
      title: 'GAME',
      url: 'https://pliki.ppe.pl/storage/df96116fd582e9edec4b/df96116fd582e9edec4b.jpg'
    },
];

const dummyCardProjects: ProjectsCardDetails = {
  currentProjects: [
    {
      id: '1',
      image: 'https://futurelab.pk.edu.pl/wp-content/uploads/sites/38/2023/07/habsat-1536x864-1-768x432.jpg',
      title: 'HABSAT',
      description: 'Projekt sondy stratosferycznej',
      team: 'WebDev',
      date: '02.05.2023'
    },
    {
      id: '2',
      image: 'https://mrzigod.pl/wp-content/uploads/2022/04/90a-rakieta-760x380.jpg',
      title: 'RAKIETA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada',
      team: 'WebDev',
      date: '02.05.2023'
    },
    {
      id: '3',
      image: 'https://pliki.ppe.pl/storage/df96116fd582e9edec4b/df96116fd582e9edec4b.jpg',
      title: 'GAME',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada',
      team: 'WebDev',
      date: '02.05.2023'
    },
  ],
  finishedProjects: [
    {
      id: '4',
      image: 'https://mrzigod.pl/wp-content/uploads/2022/04/90a-rakieta-760x380.jpg',
      title: 'RAKIETA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada',
      team: 'WebDev',
      date: '02.05.2023'
    },
    {
      id: '5',
      image: 'https://pliki.ppe.pl/storage/df96116fd582e9edec4b/df96116fd582e9edec4b.jpg',
      title: 'GAME',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuadaLorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada',
      team: 'WebDev',
      date: '02.05.2023'
    },
  ]
}
