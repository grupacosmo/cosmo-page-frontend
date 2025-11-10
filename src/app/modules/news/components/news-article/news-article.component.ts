import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { getNewsImage } from 'src/app/shared/helpers/imageHelper';
import { PostDetails } from 'src/app/shared/interfaces/PostInterfaces';
import { NewsService } from 'src/app/shared/services/news.service';
import { CustomButtonComponent } from '../../../../shared/controls/custom-button/custom-button.component';
import { NewsSummaryComponent } from '../../../../shared/components/news-summary/news-summary.component';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-news-article',
    templateUrl: './news-article.component.html',
    styleUrl: './news-article.component.scss',
    imports: [CustomButtonComponent, RouterLink, NewsSummaryComponent, DatePipe, TranslatePipe]
})
export class NewsArticleComponent {
  protected newsItem: PostDetails | 'Loading'| undefined = 'Loading';
  readonly text = {
    goBack: "news.goBack",
    author: "news.author",
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
