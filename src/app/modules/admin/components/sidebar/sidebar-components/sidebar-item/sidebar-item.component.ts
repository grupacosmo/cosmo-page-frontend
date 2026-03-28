import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../../../../../shared/pipes/translate/translate.pipe';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
})
export class SidebarItemComponent {
  title = input<string>('');
  icon = input<string>('');
  link = input<string>('');

  constructor() {}
}



