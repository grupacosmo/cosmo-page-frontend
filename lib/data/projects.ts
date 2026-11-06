import type { Project, ProjectStatus } from '@/lib/types';

const IMG = '/images/projects';

export const projects: Project[] = [
  {
    id: '1',
    shortTitle: 'HABSAT',
    title: 'projects.mocks.habsatTitle',
    cardDescription: 'projects.mocks.habsatDescription',
    shortDescription: 'projects.mocks.habsatDetailsDescriptionShort',
    description: 'projects.mocks.habsatDetailsDescription',
    experimentDescription: 'projects.mocks.habsatDetailsExperimentDescription',
    status: 'completed',
    date: '01.10.2021',
    teams: [
      {
        name: 'projects.mocks.habsatTeam',
        members: [
          'mgr. inż. Filip Zyga', 'inż. Julia Słowikowska', 'inż. Wiktor Więcław', 'Damian Kluczyński',
          'Dariusz Surdel', 'Jakub Kubica', 'Kamil Dziedzic', 'Maciej Rybiński', 'Piotr Skała',
        ],
      },
    ],
    teamPhoto: `${IMG}/habsat-cansat/habsat-cansat-team.jpg`,
    mainPhoto: {
      src: `${IMG}/habsat-cansat/habsat-cansat-main.png`,
      description: 'projects.mocks.habsatDetailsMainPhotoDescription',
    },
    experimentPhoto: {
      src: `${IMG}/habsat-cansat/habsat-cansat-eksperyment.jpg`,
      description: 'projects.mocks.subteamPhoto',
    },
    repository: { label: 'github.com/grupacosmo/cansat', url: 'https://github.com/grupacosmo/cansat' },
  },
  {
    id: '2',
    shortTitle: 'projects.mocks.rakietaTitle',
    title: 'projects.mocks.rakietaTitle',
    cardDescription: 'projects.mocks.rakietaDescription',
    shortDescription: 'projects.mocks.rakietaDetailsDescriptionShort',
    description: 'projects.mocks.rakietaDetailsDescription',
    experimentDescription: 'projects.mocks.rakietaDetailsExperimentDescription',
    status: 'current',
    date: '01.01.2023',
    teams: [
      {
        name: 'projects.mocks.rakietaTeam',
        members: [
          'Bartosz Słowik', 'Patryk Paluch', 'Michał Mruk', 'Michał Brzeziński', 'Aleksy Biela', 'Anna Derela',
          'Paweł Niedziela', 'Filip Szwed', 'Aleksander Roman', 'Karol Wypasek', 'Piotr Sus',
          'Krzysztof Radawiec', 'Bartosz Krzyk', 'Dominik Madej', 'Jakub Plicner', 'Jan Dworakowski', 'Michał Mączka',
        ],
      },
    ],
    teamPhoto: `${IMG}/rakieta/rakieta-team.png`,
    mainPhoto: {
      src: `${IMG}/rakieta/rakieta-main.jpg`,
      description: 'projects.mocks.rakietaDetailsMainPhotoDescription',
    },
    experimentPhoto: {
      src: `${IMG}/rakieta/rakieta-eksperyment.jpg`,
      description: 'projects.mocks.subteamPhoto',
    },
    repository: { label: 'github.com/grupacosmo/cosmorocket', url: 'https://github.com/grupacosmo/cosmorocket' },
  },
  {
    id: '3',
    shortTitle: 'COSMOBOT',
    title: 'projects.mocks.cosmoBotTitle',
    cardDescription: 'projects.mocks.cosmoBotDescription',
    shortDescription: 'projects.mocks.cosmoBotDetailsDescriptionShort',
    description: 'projects.mocks.cosmoBotDetailsDescription',
    experimentDescription: 'projects.mocks.cosmoBotDetailsExperimentDescription',
    status: 'current',
    date: '01.10.2023',
    teams: [
      {
        name: 'projects.mocks.cosmoBotTeam',
        members: [
          'Patryk Paluch', 'Adam Kiraly', 'Kacper Lewandowski', 'Filip Krasoń', 'Piotr Nycz',
          'Bartosz Krzyk', 'Kamil Włodarczyk', 'Tomasz Kisiel',
        ],
      },
    ],
    teamPhoto: `${IMG}/gra/gra-team.png`,
    mainPhoto: {
      src: `${IMG}/gra/gra-main.png`,
      description: 'projects.mocks.cosmoBotDetailsMainPhotoDescription',
    },
    experimentPhoto: {
      src: `${IMG}/gra/gra-eksperyment.png`,
      description: 'projects.mocks.cosmoBotDetailsModelsFromGame',
    },
    repository: { label: 'github.com/grupacosmo/cosmobot', url: 'https://github.com/grupacosmo/cosmobot' },
  },
  {
    id: '4',
    shortTitle: 'projects.mocks.dronTitle',
    title: 'projects.mocks.dronTitle',
    cardDescription: 'projects.mocks.dronDescription',
    shortDescription: 'projects.mocks.dronDetailsDescriptionShort',
    description: 'projects.mocks.dronDetailsDescription',
    experimentDescription: 'projects.mocks.dronDetailsExperimentDescription',
    status: 'current',
    date: '01.04.2023',
    teams: [
      {
        name: 'projects.mocks.dronTeam',
        members: [
          'Patryk Kusper', 'Mateusz Bielat', 'Kinga Kaim', 'Anna Derela', 'Łukasz Budziński',
          'Konrad Synowiec', 'Damian Kluczyński',
        ],
      },
    ],
    teamPhoto: `${IMG}/dron/dron-team.png`,
    mainPhoto: {
      src: `${IMG}/dron/dron-main.png`,
      description: 'projects.mocks.dronDetailsMainPhotoDescription',
    },
    experimentPhoto: {
      src: `${IMG}/dron/dron-eksperyment.jpg`,
      description: 'projects.mocks.dronDetails3dPrint',
    },
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter((project) => project.status === status);
}
