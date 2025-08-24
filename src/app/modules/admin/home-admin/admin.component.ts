import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NgStyle } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    imports: [SidebarComponent, NgStyle, RouterOutlet]
})
export class AdminComponent {
  isScrollBlocked: boolean = false;

  checkDisplay($event: any){
    console.log($event)
    this.isScrollBlocked = $event;
  }
}
