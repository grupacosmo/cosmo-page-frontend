import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem } from 'src/app/shared/models/news';
import { NewsService } from 'src/app/shared/services/news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  protected news$!: Observable<NewsItem[]>;
  protected text = {
    readMore: 'Czytaj dalej'
  }
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.news$ = this.newsService.getNews();
  }
}
