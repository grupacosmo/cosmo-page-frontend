import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
})
export class SidebarComponent {
  public path: string = "../../../../../assets/";
  windowWidth: number = window.innerWidth;
  display: boolean = false;

  @Output() isScrollBlocked = new EventEmitter<Boolean>();

  @HostListener('window:resize', ['$event'])
  
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  onRouterLinkActive($event: boolean) {
    console.log($event);
  }

  onClick() {
    this.display = !this.display;
    this.isScrollBlocked.emit(this.display);
  }
}
