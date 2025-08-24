import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { NgFor } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar-burger-item',
    templateUrl: './sidebar-burger-item.component.html',
    styleUrl: './sidebar-burger-item.component.scss',
    imports: [NgFor, RouterLinkActive, RouterLink]
})
export class SidebarBurgerItemComponent extends SidebarItemComponent{
  @Output() clickEvent = new EventEmitter<void>(); 

  onClick() {
    this.clickEvent.emit();
  }
}
