import { Component, OnInit } from '@angular/core';
import { NewsItem, NewsService } from 'src/app/shared/services/news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-summary',
  templateUrl: './news-summary.component.html',
  styleUrl: './news-summary.component.scss'
})
export class NewsSummaryComponent implements OnInit {
  protected news$!: Observable<NewsItem[]>

  protected text = {
    readMore: 'Czytaj dalej'
  }

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.news$ = this.newsService.getNews();
  }
}
