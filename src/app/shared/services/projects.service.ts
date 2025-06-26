import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ProjectCardInfo } from 'src/app/modules/projects/models/project-card-info.model';
import { ProjectItem } from '../models/project-item.model';
import { ProjectsCardDetails } from '../models/projects-card-details.model';
import { ProjectDetailsItem } from '../models/project-details-item';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ProjectItem[]> {
    // return this.http.get<ProjectItem[]>('');
    return of (dummyProjects);
  }

  getProjectsWithDetails(): Observable<ProjectDetailsItem[]> {
    // return this.http.get<ProjectItem[]>('');
    return of (dummyProjectDetails);
  }

  getProjectsCardDetails(): Observable<ProjectsCardDetails> {
    return of (dummyCardProjects);
  }

  getProject(id: string): Observable<ProjectDetailsItem> {
    const project = dummyProjectDetails.find((item) => item.id === id);
    return project ? of(project) : throwError(() => new Error('Project not found'));
  }

  addProjectWithDetails(projectDetailsItem: ProjectDetailsItem) {
    dummyProjectDetails.push(projectDetailsItem);
  }

  deleteProjectWithDetails(id: string) {
    const index = dummyProjectDetails.findIndex(p => p.id === id);
    if (index !== -1) {
      dummyProjectDetails.splice(index, 1);
    }
  }
}

const dummyProjects: ProjectItem[] = [
    {
      id: '1',
      title: 'HABSAT',
      url: '/assets/images/projects/habsat-cansat/habsat-cansat-main.png'
    },
    {
      id: '2',
      title: 'projects.mocks.rakietaTitle',
      url: '/assets/images/projects/rakieta/rakieta-main.jpg'
    },
    {
      id: '3',
      title: 'COSMOBOT',
      url: '/assets/images/projects/gra/gra-main.png'
    },
    {
      id: '4',
      title: 'projects.mocks.dronTitle',
      url: '/assets/images/projects/dron/dron-main.png'
    },
];

const dummyCardProjects: ProjectsCardDetails = {
  currentProjects: [
    {
      id: '2',
      image: '/assets/images/projects/rakieta/rakieta-main.jpg',
      title: 'projects.mocks.rakietaTitle',
      description: 'projects.mocks.rakietaDescription',
      team: 'projects.mocks.rakietaTeam',
      date: '01.01.2023'
    },
    {
      id: '3',
      image: '/assets/images/projects/gra/gra-main.png',
      title: 'projects.mocks.cosmoBotTitle',
      description: 'projects.mocks.cosmoBotDescription',
      team: 'projects.mocks.cosmoBotTeam',
      date: '02.05.2023'
    },
    {
      id: '4',
      image: '/assets/images/projects/dron/dron-main.png',
      title: 'projects.mocks.dronTitle',
      description: 'projects.mocks.dronDescription',
      team: 'projects.mocks.dronTeam',
      date: '01.04.2023'
    },
  ],
  finishedProjects: [
    {
      id: '1',
      image: '/assets/images/projects/habsat-cansat/habsat-cansat-main.png',
      title: 'projects.mocks.habsatTitle',
      description: 'projects.mocks.habsatDescription',
      team: 'projects.mocks.habsatTeam',
      date: '01.10.2021',
    },
  ]
}

const dummyProjectDetails: ProjectDetailsItem[] = [
  {
    id: '1',
    title: 'projects.mocks.habsatTitle',
    shortDescrpiton: 'projects.mocks.habsatDetailsDescriptionShort',
    teams: [
      {
        name: 'projects.mocks.habsatTeam',
        members: ['mgr. inż. Filip Zyga', 'inż. Julia Słowikowska', 'inż. Wiktor Więcław', 'Damian Kluczyński', 'Dariusz Surdel', 'Jakub Kubica', 'Kamil Dziedzic', 'Maciej Rybiński', 'Piotr Skała']
      }
    ],
    date: '01.10.2021',
    teamPhoto: '/assets/images/projects/habsat-cansat/habsat-cansat-team.jpg',
    status: 'common.completed',
    site: 'github.com/grupacosmo/cansat',
    siteUrl: 'https://github.com/grupacosmo/cansat',
    mainPhoto: '/assets/images/projects/habsat-cansat/habsat-cansat-main.png',
    mainPhotoDescription: 'projects.mocks.habsatDetailsMainPhotoDescription',
    description: 'projects.mocks.habsatDetailsDescription',
    experimentDescription: 'projects.mocks.habsatDetailsExperimentDescription',
    photos: ['/assets/images/projects/habsat-cansat/habsat-cansat-eksperyment.jpg'],
    photosDescriptions: ['projects.mocks.subteamPhoto']
  },
  {
    id: '2',
    title: 'projects.mocks.rakietaTitle',
    shortDescrpiton: 'projects.mocks.rakietaDetailsDescriptionShort',
    teams: [
      {
        name: 'projects.mocks.rakietaTeam',
        members: [
          'Bartosz Słowik', 'Patryk Paluch', 'Michał Mruk', 'Michał Brzeziński', 'Aleksy Biela', 'Anna Derela',
          'Paweł Niedziela', 'Filip Szwed', 'Aleksander Roman', 'Karol Wypasek', 'Piotr Sus',
          'Krzysztof Radawiec', 'Bartosz Krzyk', 'Dominik Madej', 'Jakub Plicner', 'Jan Dworakowski', 'Michał Mączka'
        ]
      }
    ],
    date: '01.01.2023',
    teamPhoto: '/assets/images/projects/rakieta/rakieta-team.png',
    status: 'common.current',
    site: 'github.com/grupacosmo/cosmorocket',
    siteUrl: 'https://github.com/grupacosmo/cosmorocket',
    mainPhoto: '/assets/images/projects/rakieta/rakieta-main.jpg',
    mainPhotoDescription: 'projects.mocks.rakietaDetailsMainPhotoDescription',
    description: 'projects.mocks.rakietaDetailsDescription',
    experimentDescription: 'projects.mocks.rakietaDetailsExperimentDescription',
    photos: ['/assets/images/projects/rakieta/rakieta-eksperyment.jpg'],
    photosDescriptions: ['projects.mocks.subteamPhoto']
  },
  {
    id: '3',
    title: 'projects.mocks.cosmoBotTitle',
    shortDescrpiton: 'projects.mocks.cosmoBotDetailsDescriptionShort',
    teams: [
      {
        name: 'projects.mocks.cosmoBotTeam',
        members: [
          'Patryk Paluch', 'Adam Kiraly', 'Kacper Lewandowski', 'Filip Krasoń', 'Piotr Nycz', 
          'Bartosz Krzyk', 'Kamil Włodarczyk', 'Tomasz Kisiel'
        ]
      }
    ],
    date: '01.10.2023',
    teamPhoto: '/assets/images/projects/gra/gra-team.png',
    status: 'common.current',
    site: 'github.com/grupacosmo/cosmobot',
    siteUrl: 'https://github.com/grupacosmo/cosmobot',
    mainPhoto: '/assets/images/projects/gra/gra-main.png',
    mainPhotoDescription: 'projects.mocks.cosmoBotDetailsMainPhotoDescription',
    description: 'projects.mocks.cosmoBotDetailsDescription',
    experimentDescription: 'projects.mocks.cosmoBotDetailsExperimentDescription',
    photos: ['/assets/images/projects/gra/gra-eksperyment.png'],
    photosDescriptions: ['projects.mocks.cosmoBotDetailsModelsFromGame', 'projects.mocks.cosmoBotDetailsResources']
  },
  {
    id: '4',
    title: 'projects.mocks.dronTitle',
    shortDescrpiton: 'projects.mocks.dronDetailsDescriptionShort',
    teams: [
      {
        name: 'projects.mocks.dronTeam',
        members: [
          'Patryk Kusper', 'Mateusz Bielat', 'Kinga Kaim', 'Anna Derela', 'Łukasz Budziński', 
          'Konrad Synowiec', 'Damian Kluczyński'
        ]
      }
    ],
    date: '01.04.2023',
    teamPhoto: '/assets/images/projects/dron/dron-team.png',
    status: 'common.current',
    site: '',
    siteUrl: '',
    mainPhoto: '/assets/images/projects/dron/dron-main.png',
    mainPhotoDescription: 'projects.mocks.dronDetailsMainPhotoDescription',
    description: 'projects.mocks.dronDetailsDescription',
    experimentDescription: 'projects.mocks.dronDetailsExperimentDescription',
    photos: ['/assets/images/projects/dron/dron-eksperyment.jpg'],
    photosDescriptions: ['projects.mocks.dronDetails3dPrint']
  }
];
