import { Component } from '@angular/core';
@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss',
    standalone: false
})
export class NewsComponent {
  protected text = {
    readMore: 'Czytaj dalej'
  }
}
