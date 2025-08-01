import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { map, Observable } from 'rxjs';
import { getNewsImage } from '../../helpers/imageHelper';
import { PostItem } from '../../interfaces/PostInterfaces';

@Component({
    selector: 'app-news-summary',
    templateUrl: './news-summary.component.html',
    styleUrl: './news-summary.component.scss',
    standalone: false
})
export class NewsSummaryComponent implements OnInit {
  protected readonly getNewsImage = getNewsImage

  protected news$!: Observable<PostItem[]>

  protected text = {
    news: 'Aktualności',
    readMore: 'Czytaj dalej'
  }

  private readonly newsService = inject(NewsService)

  ngOnInit() {
    this.news$ = this.newsService.getNews({ page: 0, size: 4 }).pipe(map(r => r.content));
  }

}
