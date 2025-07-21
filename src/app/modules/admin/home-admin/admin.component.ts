import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    standalone: false
})
export class AdminComponent {
  isScrollBlocked: boolean = false;

  checkDisplay($event: any){
    console.log($event)
    this.isScrollBlocked = $event;
  }
}
