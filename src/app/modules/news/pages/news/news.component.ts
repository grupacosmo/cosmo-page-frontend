import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss',
    imports: [RouterOutlet, TranslatePipe]
})
export class NewsComponent {
  readonly text = {
    news: 'navigation.news'
  }
}
