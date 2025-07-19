import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { Observable } from 'rxjs';
import { NewsItem } from '../../models/news';
import { getNewsImage } from '../../helpers/imageHelper';

@Component({
  selector: 'app-news-summary',
  templateUrl: './news-summary.component.html',
  styleUrl: './news-summary.component.scss'
})
export class NewsSummaryComponent implements OnInit {
  protected readonly getNewsImage = getNewsImage

  protected news$!: Observable<NewsItem[]>

  protected text = {
    news: 'Aktualności',
    readMore: 'Czytaj dalej'
  }

  private readonly newsService = inject(NewsService)

  ngOnInit() {
    this.news$ = this.newsService.getNews();
  }

}
