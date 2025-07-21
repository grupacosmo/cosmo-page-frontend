import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.scss',
    standalone: false
})
export class TabComponent {
  @Input()
  headerTitle = "";

  @Input()
  active = false;
}
