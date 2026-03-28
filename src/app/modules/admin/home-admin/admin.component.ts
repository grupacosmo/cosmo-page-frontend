import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [
    SidebarComponent,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
  ],
})
export class AdminComponent {
  private readonly mobileBreakpoint = 900;

  isMobile: boolean = false;
  isSidenavOpen: boolean = false;
  isScrollBlocked: boolean = false;

  ngOnInit(): void {
    this.updateLayoutState();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateLayoutState();
  }

  toggleSidenav(sidenav: MatSidenav) {
    if (!this.isMobile) {
      return;
    }

    sidenav.toggle();
  }

  private updateLayoutState() {
    this.isMobile = window.innerWidth <= this.mobileBreakpoint;
    this.isSidenavOpen = !this.isMobile;
  }

  checkDisplay($event: any) {
    console.log($event);
    this.isScrollBlocked = $event;
  }
}



