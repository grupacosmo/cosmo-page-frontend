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
      title: 'RAKIETA',
      url: '/assets/images/projects/rakieta/rakieta-main.jpg'
    },
    {
      id: '3',
      title: 'COSMOBOT',
      url: '/assets/images/projects/gra/gra-main.png'
    },
    {
      id: '4',
      title: 'DRON',
      url: '/assets/images/projects/dron/dron-main.png'
    },
];

const dummyCardProjects: ProjectsCardDetails = {
  currentProjects: [
    {
      id: '2',
      image: '/assets/images/projects/rakieta/rakieta-main.jpg',
      title: 'Rakieta',
      description: 'Projekt "Rakieta" polega na stworzeniu rakiety z własnym silnikiem i komputerem pokładowym, umożliwiającym pełną kontrolę lotu i analizę parametrów w czasie rzeczywistym, co zwiększa bezpieczeństwo i precyzję misji.',
      team: 'Zespół Rakieta',
      date: '01.01.2023'
    },
    {
      id: '3',
      image: '/assets/images/projects/gra/gra-main.png',
      title: 'Gra CosmoBot',
      description: 'Edukacyjna gra symulacyjna, w której gracze programują autonomiczne roboty do budowy bazy na obcej planecie. Rozwijaj umiejętności logiczne i ucz się fizyki poprzez eksplorację, wydobycie zasobów i zarządzanie zespołem robotów.',
      team: 'GameDev',
      date: '02.05.2023'
    },
    {
      id: '4',
      image: '/assets/images/projects/dron/dron-main.png',
      title: 'Dron',
      description: 'Projekt drona polega na budowie statku szybowcowego, który będzie służył do obserwacji terenu i transportu ładunków, z wykorzystaniem zaawansowanych technologii i symulacji aerodynamicznych.',
      team: 'Zespół Dron',
      date: '01.04.2023'
    },
  ],
  finishedProjects: [
    {
      id: '1',
      image: '/assets/images/projects/habsat-cansat/habsat-cansat-main.png',
      title: 'HABSat oraz Cansat',
      description: 'HABSAT to sonda stratosferyczna monitorująca atmosferę, a CANSAT to miniaturowy satelita testowany na różnych nośnikach. Oba projekty przesyłają dane w czasie rzeczywistym dzięki zaawansowanym czujnikom.',
      team: 'OBC',
      date: '01.10.2021',
    },
  ]
}

const dummyProjectDetails: ProjectDetailsItem[] = [
  {
    id: '1',
    title: 'HABSat oraz Cansat',
    shortDescrpiton: 'HABSAT to stratosferyczna sonda badawcza w standardzie cubesat, monitorująca zjawiska atmosferyczne, a CANSAT to miniaturowy satelita wielkości puszki, który może być testowany na rakietach, dronach i balonach. Oba projekty umożliwiają transmisję danych w czasie rzeczywistym dzięki zaawansowanym czujnikom i systemom komunikacyjnym.',
    teams: [
      {
        name: 'OBC',
        members: ['mgr. inż. Filip Zyga', 'inż. Julia Słowikowska', 'inż. Wiktor Więcław', 'Damian Kluczyński', 'Dariusz Surdel', 'Jakub Kubica', 'Kamil Dziedzic', 'Maciej Rybiński', 'Piotr Skała']
      }
    ],
    date: '01.10.2021',
    teamPhoto: '/assets/images/projects/habsat-cansat/habsat-cansat-team.jpg',
    status: 'Zakończony',
    site: 'github.com/grupacosmo/cansat',
    siteUrl: 'https://github.com/grupacosmo/cansat',
    mainPhoto: '/assets/images/projects/habsat-cansat/habsat-cansat-main.png',
    mainPhotoDescription: 'Zdjęcie wykonane z sondy HABsat',
    description: 'Projekt HABSAT i CANSAT to inicjatywy mające na celu rozwój miniaturowych urządzeń badawczych przystosowanych do obserwacji atmosfery z dużych wysokości. HABSAT jest stratosferyczną sondą skonstruowaną zgodnie ze standardem cubesat, której głównym elementem jest komputer pokładowy oparty na mikrokontrolerze STM32. Wyposażona w czujniki ciśnienia, temperatury, akcelerometr oraz moduł GPS, sonda HABSAT zbiera i przekazuje dane w czasie rzeczywistym do stacji naziemnej przez protokół LoRa. CANSAT, o rozmiarach standardowej puszki, pełni podobne funkcje, lecz jego kompaktowy rozmiar pozwala na testowanie w szerokim zakresie zastosowań – od lotów balonowych po drony. Dzięki styropianowej obudowie HABSAT jest dobrze izolowany i chroniony podczas lądowania.',
    experimentDescription: 'Eksperyment z wykorzystaniem HABSAT i CANSAT obejmuje testy operacyjne i środowiskowe, podczas których sprawdzana będzie wydajność systemu komunikacji, stabilność urządzeń w różnych warunkach atmosferycznych oraz dokładność zbieranych danych. W ramach eksperymentów HABSAT zostanie wypuszczony na wysokość stratosferyczną za pomocą balonu, a CANSAT przeprowadzi testy w różnych konfiguracjach nośników, takich jak balon czy dron, w celu oceny jego uniwersalności i odporności na warunki zewnętrzne.',
    photos: ['/assets/images/projects/habsat-cansat/habsat-cansat-eksperyment.jpg'],
    photosDescriptions: ['Zdjęcie podzespołu']
  },
  {
    id: '2',
    title: 'Rakieta',
    shortDescrpiton: 'Projekt "Rakieta" polega na stworzeniu rakiety z własnym silnikiem i komputerem pokładowym, umożliwiającym pełną kontrolę lotu i analizę parametrów w czasie rzeczywistym, co zwiększa bezpieczeństwo i precyzję misji.',
    teams: [
      {
        name: 'Zespół Rakieta',
        members: [
          'Bartosz Słowik', 'Patryk Paluch', 'Michał Mruk', 'Michał Brzeziński', 'Aleksy Biela', 'Anna Derela',
          'Paweł Niedziela', 'Filip Szwed', 'Aleksander Roman', 'Karol Wypasek', 'Piotr Sus',
          'Krzysztof Radawiec', 'Bartosz Krzyk', 'Dominik Madej', 'Jakub Plicner', 'Jan Dworakowski', 'Michał Mączka'
        ]
      }
    ],
    date: '01.01.2023',
    teamPhoto: '/assets/images/projects/rakieta/rakieta-team.png',
    status: 'Aktywny',
    site: 'github.com/grupacosmo/cosmorocket',
    siteUrl: 'https://github.com/grupacosmo/cosmorocket',
    mainPhoto: '/assets/images/projects/rakieta/rakieta-main.jpg',
    mainPhotoDescription: 'Rakieta',
    description: 'Projekt "Rakieta" to ambitna inicjatywa realizowana przez nasze koło naukowe, której celem jest stworzenie zaawansowanej rakiety badawczej, zdolnej do autonomicznego lotu i monitorowania kluczowych parametrów w czasie rzeczywistym. Projekt skupia się na opracowaniu autorskiego silnika rakietowego, zasilanego paliwem stworzonym przez nasz zespół, co daje pełną kontrolę nad procesem napędowym. Pozwala to precyzyjnie dostosować charakterystykę lotu do zadań i celów misji, co jest dużym krokiem w stronę optymalizacji wydajności oraz niezawodności systemu. W obecnej wersji rakiety zastosowano zaprojektowany od podstaw komputer pokładowy na specjalnej płytce PCB wykonanej w technologii SMD. Dzięki zaprogramowaniu systemu w języku C++, komputer pokładowy umożliwia precyzyjne śledzenie parametrów lotu oraz stałą łączność radiową ze stacją bazową. Zaawansowana elektronika pokładowa pozwala dynamicznie reagować na zmienne warunki lotu, zwiększając precyzję i bezpieczeństwo przeprowadzanych misji. Po przeprowadzonych już testach silnika zespół posiada solidne podstawy do dalszego rozwoju projektu, który otwiera nowe możliwości w zakresie technologii rakietowych i badań nad autonomicznym lotem',
    experimentDescription: 'Eksperyment polega na przeprowadzeniu testu funkcjonalności rakiety z autorskim silnikiem i komputerem pokładowym, mającym na celu weryfikację stabilności lotu, efektywności napędu oraz możliwości monitorowania parametrów w czasie rzeczywistym. W trakcie testu zbierane będą dane dotyczące wysokości, prędkości, przyspieszenia i warunków atmosferycznych. Przeprowadzony zostanie start rakiety, podczas którego komputer pokładowy będzie analizował oraz przekazywał dane do stacji naziemnej, co pozwoli na ocenę wydajności systemu sterowania i reagowanie na zmienne warunki lotu. Na podstawie wyników eksperymentu zespół oceni, czy rakieta spełnia zakładane parametry i określi potencjalne usprawnienia w konstrukcji i oprogramowaniu.',
    photos: ['/assets/images/projects/rakieta/rakieta-eksperyment.jpg'],
    photosDescriptions: ['Zdjęcie podzespołu']
  },
  {
    id: '3',
    title: 'Cosmobot - Gra Edukacyjna',
    shortDescrpiton: 'Edukacyjna gra symulacyjna, w której gracze programują autonomiczne roboty do budowy bazy na obcej planecie. Rozwijaj umiejętności logiczne i ucz się fizyki poprzez eksplorację, wydobycie zasobów i zarządzanie zespołem robotów.',
    teams: [
      {
        name: 'GameDev',
        members: [
          'Patryk Paluch', 'Adam Kiraly', 'Kacper Lewandowski', 'Filip Krasoń', 'Piotr Nycz', 
          'Bartosz Krzyk', 'Kamil Włodarczyk', 'Tomasz Kisiel'
        ]
      }
    ],
    date: '01.10.2023',
    teamPhoto: '/assets/images/projects/gra/gra-team.png',
    status: 'Aktywny',
    site: 'github.com/grupacosmo/cosmobot',
    siteUrl: 'https://github.com/grupacosmo/cosmobot',
    mainPhoto: '/assets/images/projects/gra/gra-main.png',
    mainPhotoDescription: 'Grafika przedstawiająca misję kosmiczną w grze Cosmobot',
    description: 'Cosmobot to edukacyjna gra strategiczna, której celem jest nauczenie graczy przeprowadzania misji kosmicznych przy użyciu programowalnych robotów. Gracz wciela się w rolę dowódcy zespołu autonomicznych robotów, których zadaniem jest eksploracja oraz budowa bazy na obcej planecie. Aby ukończyć misje, gracze muszą programować roboty do takich zadań jak wydobycie zasobów, transport materiałów i obrona przed zagrożeniami. Cosmobot łączy naukę z rozrywką, wykorzystując mechaniki inspirowane grami takimi jak Factorio i GLADIABOTS. Gra pozwala na rozwijanie umiejętności logicznego myślenia, algorytmiki i programowania poprzez rozwiązywanie złożonych problemów i wyzwań technologicznych.',
    experimentDescription: 'Eksperyment polega na testowaniu różnych scenariuszy w grze, aby zweryfikować skuteczność nauczania podstaw programowania i zarządzania zasobami w symulowanych warunkach misji kosmicznej. Gracz programuje autonomiczne roboty do realizacji zadań takich jak budowa, wydobycie i obrona bazy, a wyniki eksperymentu pozwolą określić, jak efektywnie gracze uczą się poprzez grę i jak można zwiększyć jej walory edukacyjne.',
    photos: ['/assets/images/projects/gra/gra-eksperyment.png'],
    photosDescriptions: ['Modele z gry', 'Wydobycie zasobów przez roboty']
  },
  {
    id: '4',
    title: 'Dron',
    shortDescrpiton: 'Projekt drona polega na budowie statku szybowcowego, który będzie służył do obserwacji terenu i transportu ładunków, z wykorzystaniem zaawansowanych technologii i symulacji aerodynamicznych.',
    teams: [
      {
        name: 'Zespół Dron',
        members: [
          'Patryk Kusper', 'Mateusz Bielat', 'Kinga Kaim', 'Anna Derela', 'Łukasz Budziński', 
          'Konrad Synowiec', 'Damian Kluczyński'
        ]
      }
    ],
    date: '01.04.2023',
    teamPhoto: '/assets/images/projects/dron/dron-team.png',
    status: 'Aktywny',
    site: '',
    siteUrl: '',
    mainPhoto: '/assets/images/projects/dron/dron-main.png',
    mainPhotoDescription: 'Grafika przedstawiająca projekt drona',
    description: 'Projekt Dron to zaawansowana platforma szybowcowa, której celem jest przeprowadzanie obserwacji i transport ładunków. Zespół inżynierów opracowuje drona z użyciem narzędzi takich jak ANSYS Workbench i Inventor, pozwalających na symulacje aerodynamiczne i optymalizację wytrzymałości konstrukcji. Konstrukcja drona opiera się na włóknie szklanym oraz technologii druku 3D, co zapewnia lekkość i wytrzymałość. Projekt zakłada stworzenie uniwersalnej platformy, która dzięki lekkiej i wytrzymałej konstrukcji, będzie odpowiednia zarówno do misji obserwacyjnych, jak i transportowych.',
    experimentDescription: 'Eksperyment polega na testowaniu miniaturowego modelu drona w celu weryfikacji założeń aerodynamicznych oraz wytrzymałościowych projektu. Model zostanie poddany serii lotów testowych, podczas których monitorowane będą takie parametry jak stabilność, nośność oraz reakcja na różne warunki atmosferyczne, co pozwoli na optymalizację projektu pełnowymiarowego drona.',
    photos: ['/assets/images/projects/dron/dron-eksperyment.jpg'],
    photosDescriptions: ['Wydrukowana za pomoca druku 3D część drona']
  }
];
