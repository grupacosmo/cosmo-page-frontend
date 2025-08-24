import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';
import { NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarItemComponent } from './sidebar-components/sidebar-item/sidebar-item.component';
import { SidebarBurgerItemComponent } from './sidebar-components/sidebar-burger-item/sidebar-burger-item.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [NgIf, RouterLink, SidebarItemComponent, NgStyle, SidebarBurgerItemComponent]
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
