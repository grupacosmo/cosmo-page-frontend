import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

@Component({
    selector: 'app-sidebar-burger-item',
    templateUrl: './sidebar-burger-item.component.html',
    styleUrl: './sidebar-burger-item.component.scss',
    standalone: false
})
export class SidebarBurgerItemComponent extends SidebarItemComponent{
  @Output() clickEvent = new EventEmitter<void>(); 

  onClick() {
    this.clickEvent.emit();
  }
}
