import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarElementsService {
  constructor() {}

  sidebarElements: any[] = [
    {
      title: 'admin.controlPanel',
      icon: 'dashboard',
      link: '/admin',
    },
    {
      title: 'admin.contentManagement',
      icon: 'edit',
      link: '/admin/addPost',
    },
  ];

  getSidebarElements() {
    return this.sidebarElements;
  }
}



