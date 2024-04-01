import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  getProjectsCardDetails(): Observable<ProjectsCardDetails> {
    return of (dummyCardProjects);
  }

  getProject(id: string): Observable<ProjectDetailsItem> {
    return of (dummyProjectDetails[0]);
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

const dummyProjectDetails: ProjectDetailsItem[] = [
  {
    id: '1',
    title: 'HABSat',
    shortDescrpiton: 'Projekt sondy stratosferycznej',
    teams: [
      {
        name: 'OBC',
        members: ['Maciej Rybiński', 'Darek Surdel', 'Jakub Kubica', 'Kamil Dziedzic', 'inż. Julia Słowikowska', 'Piotr Skała', 'inż. Wiktor Więcław']
      },
      {
        name: 'WebDev',
        members: ['Mateusz Jamróz', 'Artur Pajor', 'Adrian Cygan', 'Michał Piotrkowski']
      }
    ],
    date: '02.05.2023',
    teamPhoto: 'https://habsat.pl/static/media/team.a2ec47ec.jpg',
    status: 'Aktywny',
    site: 'habsat.pl',
    siteUrl: 'https://habsat.pl/',
    mainPhoto: 'https://futurelab.pk.edu.pl/wp-content/uploads/sites/38/2023/07/habsat-1536x864-1-768x432.jpg',
    mainPhotoDescription: 'Zdjęcie wykonane z sondy HABsat, 02.05.2012',
    description: 'HABSat jest urządzeniem pomiarowym do przeprowadzania eksperymentów w stratosferze na wysokości, ok. 30 km nad ziemią. Stanowi platformę eksperymentalną do bezpiecznego wysyłania w stratosferę projektów badawczych, które wymagają warunków zbliżonych do tych panujących w przestrzeni kosmicznej. Rozbudowa platformy HABSat pozwoli na zbieranie doświadczenia niezbędnego do budowy bardziej skomplikowanych konstrukcji typu CubeSat.',
    experimentDescription: 'Detektor został opracowany przez Katarzynę Smelcerz w ramach badań do rozprawy doktorskiej: “Rozwój systemu detekcji promieniowania kosmicznego, oparty o zespół rozproszonych detektorów scyntylacyjnych” pod opieką prof. dr hab. Jerzy W. Mietelskiego. Zasada działania opiera się na wykrywaniu fotonów, które powstają przy uderzaniu cząstek kosmicznych w scyntylator (w tym wypadku kwadratowa płytka ze specjalnego tworzywa o grubości ok. 10 mm). Do środka scyntylator a przylega fotopowielacz, który wzmacnia fotony powstające przy uderzeniach cząstek kosmicznych i zamienia je na impulsy elektryczne. Impulsy są podawane na wejście wzmacniacza, a następnie są mierzone przez mikrokontroler. Mikrokontroler współpracuje z modułem GPS, z którego odczytuje czas i trzy współrzędne (szerokość i długość geograficzną oraz wysokość nad poziomem morza). Każde zdarzenie jest zapisywane do zewnętrznej pamięci Flash. Rejestrowana jest amplituda, czas zdarzenia, oraz trzy współrzędne. Detektor zostanie wysłany w górne warstwy atmosfery przy pomocy balonu. Celem tego eksperymentu jest zbadanie ilości cząstek kosmicznych jako funkcji wysokości. Uważa się, że atmosfera przechwytuje cząstki (tłumi promieniowanie kosmiczne), zatem wysoko ilość detekcji powinna być większa. Kolejne zagadnienie, które jest badane, to jak przebiega tłumienie cząstek wysokoenergetycznych w funkcji wysokości w porównaniu z tłumieniem cząstek niskoenergetycznych.',
    photos: ['https://habsat.pl/static/media/eksperyment.3258c20e.jpg'],
    photosDescriptions: ['Detektor']
  }
]