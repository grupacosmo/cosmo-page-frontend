import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem, NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  protected news$!: Observable<NewsItem[]>;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.news$ = this.newsService.getNews();
  }
}
