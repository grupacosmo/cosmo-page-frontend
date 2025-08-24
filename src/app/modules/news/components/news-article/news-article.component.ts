import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { getNewsImage } from 'src/app/shared/helpers/imageHelper';
import { PostDetails } from 'src/app/shared/interfaces/PostInterfaces';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
    selector: 'app-news-article',
    templateUrl: './news-article.component.html',
    styleUrl: './news-article.component.scss',
    standalone: false
})
export class NewsArticleComponent {
  protected newsItem: PostDetails | 'Loading'| undefined = 'Loading';
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
      if (typeof item === 'object') {
        this.newsItem = item;
      }
      else {
        this.router.navigate(['']);
      }
    })
  }

  getNewsImage = (url?:string) => getNewsImage(url, true);
}
