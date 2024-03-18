import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface ProjectItem {
  id: string,
  title: string,
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ProjectItem[]> {
    // return this.http.get<ProjectItem[]>('');
    return of (dummyProjects);
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