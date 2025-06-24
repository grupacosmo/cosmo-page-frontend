import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../../shared/pipes/translate/translate.pipe';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatIconModule, TranslatePipe, LanguagePickerComponent],
  standalone: true
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
