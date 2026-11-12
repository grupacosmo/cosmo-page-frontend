import type { CosmoEvent } from '@/lib/types';

/**
 * Hardcoded events (placeholder content — replace with real ones or move to the backend).
 *
 * Each event carries its own text per locale. An event is listed only in the locales it has a
 * translation for; a locale without any translated events shows the "no events" message instead.
 * Dates are ISO 8601 with an explicit offset (Europe/Warsaw).
 */
export const events: CosmoEvent[] = [
  {
    id: 'spotkanie-rekrutacyjne-2026',
    date: '2026-11-18T18:00:00+01:00',
    endDate: '2026-11-18T20:00:00+01:00',
    image: '/images/about-us-photo.jpg',
    url: 'https://forms.gle/TvgdyiFCgxRbrSQ48',
    translations: {
      pl: {
        title: 'Spotkanie rekrutacyjne Cosmo PK',
        location: 'Politechnika Krakowska, ul. Warszawska 24',
        description:
          'Chcesz budować rakiety, sondy stratosferyczne albo gry o eksploracji kosmosu? Przyjdź na spotkanie rekrutacyjne! Opowiemy o naszych projektach, pokażemy sprzęt, nad którym pracujemy, i przedstawimy zespoły, do których możesz dołączyć. Nie musisz mieć doświadczenia – wystarczy zapał i ciekawość. Po części oficjalnej zapraszamy na rozmowy z liderami zespołów przy pizzy.',
      },
      en: {
        title: 'Cosmo PK recruitment meeting',
        location: 'Cracow University of Technology, 24 Warszawska St.',
        description:
          'Want to build rockets, stratospheric probes or space exploration games? Join our recruitment meeting! We will talk about our projects, show the hardware we are working on and introduce the teams you can join. No experience required – just enthusiasm and curiosity. After the official part, stay for a chat with the team leads over pizza.',
      },
    },
  },
  {
    id: 'cosmobot-otwarte-testy',
    date: '2026-11-27T17:00:00+01:00',
    image: '/images/projects/gra/gra-main.png',
    translations: {
      pl: {
        title: 'CosmoBot – otwarte testy gry',
        location: 'FutureLab PK',
        description:
          'Zespół GameDev zaprasza na otwarte testy najnowszej wersji CosmoBota. Zaprogramuj własne roboty, wydobądź zasoby i zbuduj bazę na obcej planecie. Szukamy graczy, którzy pomogą nam dopracować samouczek i poziom trudności misji – każda uwaga jest na wagę złota.',
      },
      en: {
        title: 'CosmoBot – open playtest',
        location: 'FutureLab PK',
        description:
          'The GameDev team invites you to an open playtest of the latest CosmoBot build. Program your own robots, mine resources and build a base on an alien planet. We are looking for players to help us polish the tutorial and mission difficulty – every piece of feedback counts.',
      },
    },
  },
  {
    id: 'test-silnika-rakietowego',
    date: '2026-12-12T10:00:00+01:00',
    endDate: '2026-12-12T15:00:00+01:00',
    image: '/images/projects/rakieta/rakieta-eksperyment.jpg',
    translations: {
      pl: {
        title: 'Statyczny test silnika rakietowego',
        location: 'Poligon testowy pod Krakowem',
        description:
          'Kolejny statyczny test autorskiego silnika na paliwo stałe. Tym razem sprawdzimy nową dyszę oraz zmodyfikowany skład paliwa, a komputer pokładowy zarejestruje ciąg, ciśnienie i temperaturę w czasie rzeczywistym. Relację i wyniki pomiarów opublikujemy w mediach społecznościowych.',
      },
      en: {
        title: 'Rocket engine static fire test',
        location: 'Test site near Kraków',
        description:
          'Another static fire test of our in-house solid-fuel engine. This time we will verify a new nozzle and a modified propellant mix, while the flight computer records thrust, pressure and temperature in real time. A report and the measurement results will be published on our social media.',
      },
    },
  },
  {
    id: 'warsztaty-lutowania-pcb',
    date: '2027-01-15T16:00:00+01:00',
    endDate: '2027-01-15T19:00:00+01:00',
    image: '/images/projects/habsat-cansat/habsat-cansat-main.png',
    translations: {
      pl: {
        title: 'Warsztaty: projektowanie i lutowanie PCB',
        location: 'Wydział Informatyki i Matematyki PK',
        description:
          'Praktyczne warsztaty z projektowania płytek drukowanych i lutowania elementów SMD. Na przykładzie komputera pokładowego sondy HABSat pokażemy cały proces: od schematu, przez projekt płytki, aż po montaż i uruchomienie. Liczba miejsc ograniczona, sprzęt zapewniamy.',
      },
      en: {
        title: 'Workshop: PCB design and soldering',
        location: 'Faculty of Computer Science and Mathematics, CUT',
        description:
          'Hands-on workshop on printed circuit board design and SMD soldering. Using the HABSat flight computer as an example, we will walk through the whole process: from the schematic and board layout to assembly and bring-up. Limited seats, all equipment provided.',
      },
    },
  },
  {
    id: 'lot-habsat-2027',
    date: '2027-03-20T08:00:00+01:00',
    endDate: '2027-03-21T18:00:00+01:00',
    image: '/images/projects/habsat-cansat/habsat-cansat-eksperyment.jpg',
    translations: {
      pl: {
        title: 'Lot stratosferyczny HABSat 2027',
        location: 'Okolice Krakowa',
        description:
          'Wypuszczamy nową wersję sondy HABSat na wysokość ponad 30 km. Na pokładzie znajdą się czujniki ciśnienia, temperatury i promieniowania oraz kamera. Telemetrię będzie można śledzić na żywo dzięki łączności LoRa, a po lądowaniu ruszamy na poszukiwania sondy.',
      },
      en: {
        title: 'HABSat 2027 stratospheric flight',
        location: 'Kraków area',
        description:
          'We are launching a new version of the HABSat probe to an altitude of over 30 km. It will carry pressure, temperature and radiation sensors as well as a camera. Telemetry can be followed live over LoRa, and after landing we set off to recover the probe.',
      },
    },
  },
  {
    id: 'dzien-otwarty-pk-2027',
    date: '2027-04-17T10:00:00+02:00',
    endDate: '2027-04-17T15:00:00+02:00',
    image: '/images/rocket.jpg',
    translations: {
      pl: {
        title: 'Dzień otwarty Politechniki Krakowskiej',
        location: 'Kampus Warszawska, Politechnika Krakowska',
        description:
          'Odwiedź stoisko Cosmo PK podczas dnia otwartego uczelni. Pokażemy modele rakiety i drona, sondę HABSat oraz grę CosmoBot. To świetna okazja, żeby porozmawiać z członkami koła i dowiedzieć się, jak wygląda praca nad projektami kosmicznymi na studiach.',
      },
      en: {
        title: 'Cracow University of Technology open day',
        location: 'Warszawska Campus, Cracow University of Technology',
        description:
          'Visit the Cosmo PK booth during the university open day. We will show models of our rocket and drone, the HABSat probe and the CosmoBot game. A great chance to talk to club members and see what working on space projects during your studies looks like.',
      },
    },
  },
  {
    id: 'warsztaty-wprowadzajace-2026',
    date: '2026-10-15T17:00:00+02:00',
    image: '/images/night-sky.jpeg',
    translations: {
      pl: {
        title: 'Warsztaty wprowadzające dla nowych członków',
        location: 'Politechnika Krakowska, ul. Warszawska 24',
        description:
          'Pierwsze spotkanie nowego roku akademickiego. Nowi członkowie poznali zespoły, narzędzia, z których korzystamy, oraz plany projektów na nadchodzący rok. Dziękujemy wszystkim za tak liczne przybycie!',
      },
      en: {
        title: 'Introductory workshop for new members',
        location: 'Cracow University of Technology, 24 Warszawska St.',
        description:
          'The first meeting of the new academic year. New members got to know the teams, the tools we use and our project plans for the coming year. Thank you all for such a great turnout!',
      },
    },
  },
  {
    id: 'test-modelu-drona',
    date: '2026-09-20T09:00:00+02:00',
    image: '/images/projects/dron/dron-eksperyment.jpg',
    translations: {
      pl: {
        title: 'Loty testowe modelu drona',
        location: 'Lotnisko modelarskie, Kraków',
        description:
          'Zespół Dron przeprowadził serię lotów testowych pomniejszonego modelu szybowca. Zebrane dane o stabilności i nośności posłużą do dopracowania pełnowymiarowej konstrukcji z włókna szklanego i elementów drukowanych w 3D.',
      },
      en: {
        title: 'Drone model test flights',
        location: 'Model airfield, Kraków',
        description:
          'The Drone team carried out a series of test flights of a scaled-down glider model. The stability and lift data collected will help refine the full-size airframe made of fibreglass and 3D-printed parts.',
      },
    },
  },
  {
    id: 'lot-habsat-cansat-2026',
    date: '2026-06-14T08:00:00+02:00',
    image: '/images/projects/habsat-cansat/habsat-cansat-team.jpg',
    translations: {
      pl: {
        title: 'Lot sondy HABSat i test CanSata',
        location: 'Okolice Krakowa',
        description:
          'Sonda HABSat osiągnęła stratosferę i przesłała komplet danych telemetrycznych, a CanSat przeszedł pierwsze testy zrzutu z drona. Dziękujemy wszystkim, którzy pomagali w przygotowaniach i poszukiwaniach sondy po lądowaniu.',
      },
      en: {
        title: 'HABSat flight and CanSat test',
        location: 'Kraków area',
        description:
          'The HABSat probe reached the stratosphere and transmitted a full set of telemetry, while the CanSat passed its first drop tests from a drone. Thanks to everyone who helped with the preparations and with recovering the probe after landing.',
      },
    },
  },
  {
    id: 'festiwal-nauki-2026',
    date: '2026-05-23T10:00:00+02:00',
    endDate: '2026-05-24T17:00:00+02:00',
    image: '/images/satellite.jpg',
    translations: {
      pl: {
        title: 'Festiwal Nauki i Sztuki w Krakowie',
        location: 'Rynek Główny, Kraków',
        description:
          'Na naszym stoisku odwiedzający mogli z bliska obejrzeć rakietę, porozmawiać o projektach i zagrać we wczesną wersję CosmoBota. Dziękujemy za setki pytań i świetną atmosferę!',
      },
      en: {
        title: 'Science and Art Festival in Kraków',
        location: 'Main Market Square, Kraków',
        description:
          'Visitors to our booth could take a close look at the rocket, talk about our projects and play an early version of CosmoBot. Thank you for hundreds of questions and a great atmosphere!',
      },
    },
  },
];
