import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateY(0)'
      })),
      state('out', style({
        transform: 'translateY(-100%)'
      })),
      transition('out => in', [
        animate('0.5s ease-out')
      ]),
      transition('in => out', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  get menuState() {
    return this.menuOpen ? 'in' : 'out';
  }
}
