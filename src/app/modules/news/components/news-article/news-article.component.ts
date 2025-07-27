import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { NewsItem } from 'src/app/shared/models/news';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
    selector: 'app-news-article',
    templateUrl: './news-article.component.html',
    styleUrl: './news-article.component.scss',
    standalone: false
})
export class NewsArticleComponent {
  protected newsItem: NewsItem | 'Loading'| undefined = 'Loading';
  protected text = {
    readMore: 'Czytaj dalej',
    moreNews: "Więcej aktualności",
    goBack: "Powrót do aktualności",
    author: "Autor",
  }
  constructor(
      private route: ActivatedRoute,
      private newsService: NewsService,
      private router: Router
    ) {}

  ngOnInit() {
    this.route.params
    .pipe(
      map(params => params['slug']),
      filter((slug: string) => !!slug),
      switchMap(slug => this.newsService.getBySlug(slug)),
    ).subscribe(item => {
      if (item) {
        this.newsItem = item;
      }
      else {
        this.router.navigate(['']);
      }
    })

  }
}
