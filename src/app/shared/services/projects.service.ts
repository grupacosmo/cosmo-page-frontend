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
      title: 'HABSat oraz Cansat',
      description: 'Projekt sondy stratosferycznej',
      team: 'OBC, WebDev',
      date: '01.10.2021'
    },
    {
      id: '2',
      image: 'https://mrzigod.pl/wp-content/uploads/2022/04/90a-rakieta-760x380.jpg',
      title: 'RAKIETA',
      description: 'Projekt "Rakieta" polega na stworzeniu rakiety z własnym silnikiem i komputerem pokładowym, umożliwiającym pełną kontrolę lotu i analizę parametrów w czasie rzeczywistym, co zwiększa bezpieczeństwo i precyzję misji.',
      team: 'OBC, WebDev',
      date: '01.01.2023'
    },
    {
      id: '3',
      image: 'https://pliki.ppe.pl/storage/df96116fd582e9edec4b/df96116fd582e9edec4b.jpg',
      title: 'GAME',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada',
      team: 'WebDev',
      date: '02.05.2023'
    },
    {
      id: '4',
      image: '../../../../assets/images/projekt-drona.png',
      title: 'DRON',
      description: 'Projekt drona polega na budowie statku szybowcowego, który będzie służył do obserwacji terenu i transportu ładunków, z wykorzystaniem zaawansowanych technologii i symulacji aerodynamicznych.',
      team: 'OBC',
      date: '01.04.2023'
    },
  ],
  finishedProjects: [
    {
      id: '4',
      image: 'https://mrzigod.pl/wp-content/uploads/2022/04/90a-rakieta-760x380.jpg',
      title: 'RAKIETA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada',
      team: 'WebDev',
      date: '01.01.2023'
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
    title: 'HABSat oraz Cansat',
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
    date: '01.10.2021',
    teamPhoto: 'https://habsat.pl/static/media/team.a2ec47ec.jpg',
    status: 'Aktywny',
    site: 'habsat.pl',
    siteUrl: 'https://habsat.pl/',
    mainPhoto: 'https://futurelab.pk.edu.pl/wp-content/uploads/sites/38/2023/07/habsat-1536x864-1-768x432.jpg',
    mainPhotoDescription: 'Zdjęcie wykonane z sondy HABsat, 02.05.2012',
    description: 'HABSAT jest stratosferyczną sondą, zbudowana w satelitarnym standardzie cubsat. Cały układ opiera się na mikrokontrolerze STM32, który zbiera wszystkie informacje z czujników oraz odpowiada za komunikację ze stacją na ziemi.  Komputer jest wyposażony w czujniki ciśnienia i temperatury, akcelerometr oraz moduł GPS. Komunikacja ze stacją na ziemi odbywa się za pomocą protokołu LoRa. Wszystkie jest zamknięte w obudowie styropianowej, która zarówno izoluje komputer od czynników zewnętrznych, ale też pełni rolę amortyzacji przy lądowaniu. CANSAT pełni te same zadania jak HABSAT. Dzięki jest jego rozmiarowi, może być zamontowany na pokładzie rakiety, balonu stratosferycznego lub drona, co daje szerokie możliwości testowania technologii w różnych warunkach. Obie konstrukcje, dzięki zastosowaniu zaawansowanych czujników oraz systemów komunikacyjnych, pozwalają na przesyłanie danych w czasie rzeczywistym do stacji naziemnej. Obecnie projekty są gotowe do dalszego rozwoju oraz przeprowadzania eksperymentów.',
    experimentDescription: 'Detektor został opracowany przez Katarzynę Smelcerz w ramach badań do rozprawy doktorskiej: “Rozwój systemu detekcji promieniowania kosmicznego, oparty o zespół rozproszonych detektorów scyntylacyjnych” pod opieką prof. dr hab. Jerzy W. Mietelskiego. Zasada działania opiera się na wykrywaniu fotonów, które powstają przy uderzaniu cząstek kosmicznych w scyntylator (w tym wypadku kwadratowa płytka ze specjalnego tworzywa o grubości ok. 10 mm). Do środka scyntylator a przylega fotopowielacz, który wzmacnia fotony powstające przy uderzeniach cząstek kosmicznych i zamienia je na impulsy elektryczne. Impulsy są podawane na wejście wzmacniacza, a następnie są mierzone przez mikrokontroler. Mikrokontroler współpracuje z modułem GPS, z którego odczytuje czas i trzy współrzędne (szerokość i długość geograficzną oraz wysokość nad poziomem morza). Każde zdarzenie jest zapisywane do zewnętrznej pamięci Flash. Rejestrowana jest amplituda, czas zdarzenia, oraz trzy współrzędne. Detektor zostanie wysłany w górne warstwy atmosfery przy pomocy balonu. Celem tego eksperymentu jest zbadanie ilości cząstek kosmicznych jako funkcji wysokości. Uważa się, że atmosfera przechwytuje cząstki (tłumi promieniowanie kosmiczne), zatem wysoko ilość detekcji powinna być większa. Kolejne zagadnienie, które jest badane, to jak przebiega tłumienie cząstek wysokoenergetycznych w funkcji wysokości w porównaniu z tłumieniem cząstek niskoenergetycznych.',
    photos: ['https://habsat.pl/static/media/eksperyment.3258c20e.jpg'],
    photosDescriptions: ['Detektor']
  },
  {
    id: '2',
    title: 'Rakieta',
    shortDescrpiton: 'Projekt "Rakieta" polega na stworzeniu rakiety z własnym silnikiem i komputerem pokładowym, umożliwiającym pełną kontrolę lotu i analizę parametrów w czasie rzeczywistym, co zwiększa bezpieczeństwo i precyzję misji.',
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
    date: '01.01.2023',
    teamPhoto: 'https://habsat.pl/static/media/team.a2ec47ec.jpg',
    status: 'Aktywny',
    site: 'habsat.pl',
    siteUrl: 'https://habsat.pl/',
    mainPhoto: 'https://mrzigod.pl/wp-content/uploads/2022/04/90a-rakieta-760x380.jpg',
    mainPhotoDescription: 'Zdjęcie do wizualizacji projektu',
    description: 'Projekt "Rakieta" to ambitna inicjatywa realizowana przez nasze koło naukowe, której celem jest stworzenie zaawansowanej rakiety badawczej, zdolnej do autonomicznego lotu i monitorowania kluczowych parametrów w czasie rzeczywistym. Projekt skupia się na opracowaniu autorskiego silnika rakietowego, zasilanego paliwem stworzonym przez nasz zespół, co daje pełną kontrolę nad procesem napędowym. Pozwala to precyzyjnie dostosować charakterystykę lotu do zadań i celów misji, co jest dużym krokiem w stronę optymalizacji wydajności oraz niezawodności systemu. W obecnej wersji rakiety zastosowano zaprojektowany od podstaw komputer pokładowy na specjalnej płytce PCB wykonanej w technologii SMD. Dzięki zaprogramowaniu systemu w języku C++, komputer pokładowy umożliwia precyzyjne śledzenie parametrów lotu oraz stałą łączność radiową ze stacją bazową. Zaawansowana elektronika pokładowa pozwala dynamicznie reagować na zmienne warunki lotu, zwiększając precyzję i bezpieczeństwo przeprowadzanych misji. Po przeprowadzonych już testach silnika zespół posiada solidne podstawy do dalszego rozwoju projektu, który otwiera nowe możliwości w zakresie technologii rakietowych i badań nad autonomicznym lotem',
    experimentDescription: 'Eksperyment polega na przeprowadzeniu testu funkcjonalności rakiety z autorskim silnikiem i komputerem pokładowym, mającym na celu weryfikację stabilności lotu, efektywności napędu oraz możliwości monitorowania parametrów w czasie rzeczywistym. W trakcie testu zbierane będą dane dotyczące wysokości, prędkości, przyspieszenia i warunków atmosferycznych. Przeprowadzony zostanie start rakiety, podczas którego komputer pokładowy będzie analizował oraz przekazywał dane do stacji naziemnej, co pozwoli na ocenę wydajności systemu sterowania i reagowanie na zmienne warunki lotu. Na podstawie wyników eksperymentu zespół oceni, czy rakieta spełnia zakładane parametry i określi potencjalne usprawnienia w konstrukcji i oprogramowaniu.',
    photos: ['https://habsat.pl/static/media/eksperyment.3258c20e.jpg'],
    photosDescriptions: ['Rakieta']
  },
  {
    id: '3',
    title: 'Cosmobot - Gra Edukacyjna',
    shortDescrpiton: 'Cosmobot to gra edukacyjna, w której gracz uczy się zarządzać misją kosmiczną, programując autonomiczne roboty do eksploracji i budowy bazy na obcej planecie.',
    teams: [
      {
        name: 'Game Development',
        members: ['Anna Nowak', 'Paweł Maj', 'Zofia Kowalczyk', 'Tomasz Wróbel', 'Marek Kaczmarek']
      },
      {
        name: 'Design',
        members: ['Katarzyna Woźniak', 'Julia Malinowska', 'Łukasz Michalski']
      }
    ],
    date: '01.10.2023',
    teamPhoto: 'https://cosmobot.pl/static/media/team.abc123.jpg',
    status: 'Aktywny',
    site: 'cosmobot.pl',
    siteUrl: 'https://cosmobot.pl/',
    mainPhoto: 'https://cosmobot.pl/static/media/game_visualization.jpg',
    mainPhotoDescription: 'Grafika przedstawiająca misję kosmiczną w grze Cosmobot',
    description: 'Cosmobot to edukacyjna gra strategiczna, której celem jest nauczenie graczy przeprowadzania misji kosmicznych przy użyciu programowalnych robotów. Gracz wciela się w rolę dowódcy zespołu autonomicznych robotów, których zadaniem jest eksploracja oraz budowa bazy na obcej planecie. Aby ukończyć misje, gracze muszą programować roboty do takich zadań jak wydobycie zasobów, transport materiałów i obrona przed zagrożeniami. Cosmobot łączy naukę z rozrywką, wykorzystując mechaniki inspirowane grami takimi jak Factorio i GLADIABOTS. Gra pozwala na rozwijanie umiejętności logicznego myślenia, algorytmiki i programowania poprzez rozwiązywanie złożonych problemów i wyzwań technologicznych.',
    experimentDescription: 'Eksperyment polega na testowaniu różnych scenariuszy w grze, aby zweryfikować skuteczność nauczania podstaw programowania i zarządzania zasobami w symulowanych warunkach misji kosmicznej. Gracz programuje autonomiczne roboty do realizacji zadań takich jak budowa, wydobycie i obrona bazy, a wyniki eksperymentu pozwolą określić, jak efektywnie gracze uczą się poprzez grę i jak można zwiększyć jej walory edukacyjne.',
    photos: ['https://cosmobot.pl/static/media/game_screenshot_1.jpg', 'https://cosmobot.pl/static/media/game_screenshot_2.jpg'],
    photosDescriptions: ['Misja budowy bazy', 'Wydobycie zasobów przez roboty']
  },
  {
    id: '4',
    title: 'Dron',
    shortDescrpiton: 'Projekt drona polega na budowie statku szybowcowego, który będzie służył do obserwacji terenu i transportu ładunków, z wykorzystaniem zaawansowanych technologii i symulacji aerodynamicznych.',
    teams: [
      {
        name: 'Zespół Dron',
        members: ['Patryk Kusper', 'Anna Rybicka', 'Damian Wołoszyn', 'Alicja Krupa']
      }
    ],
    date: '01.04.2023',
    teamPhoto: 'https://dronprojekt.pl/static/media/team.drone123.jpg',
    status: 'Aktywny',
    site: 'dronprojekt.pl',
    siteUrl: 'https://dronprojekt.pl/',
    mainPhoto: '../../../../assets/images/projekt-drona.png',
    mainPhotoDescription: 'Grafika przedstawiająca projekt drona',
    description: 'Projekt Dron to zaawansowana platforma szybowcowa, której celem jest przeprowadzanie obserwacji i transport ładunków. Zespół inżynierów opracowuje drona z użyciem narzędzi takich jak ANSYS Workbench i Inventor, pozwalających na symulacje aerodynamiczne i optymalizację wytrzymałości konstrukcji. Konstrukcja drona opiera się na włóknie szklanym oraz technologii druku 3D, co zapewnia lekkość i wytrzymałość. Projekt zakłada stworzenie uniwersalnej platformy, która dzięki lekkiej i wytrzymałej konstrukcji, będzie odpowiednia zarówno do misji obserwacyjnych, jak i transportowych.',
    experimentDescription: 'Eksperyment polega na testowaniu miniaturowego modelu drona w celu weryfikacji założeń aerodynamicznych oraz wytrzymałościowych projektu. Model zostanie poddany serii lotów testowych, podczas których monitorowane będą takie parametry jak stabilność, nośność oraz reakcja na różne warunki atmosferyczne, co pozwoli na optymalizację projektu pełnowymiarowego drona.',
    photos: ['../../../../assets/images/dron-czesc.jpg'],
    photosDescriptions: ['Wydrukowana za pomoca druku 3D część drona']
  }  
]