import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { map, Observable } from 'rxjs';
import { getNewsImage } from '../../helpers/imageHelper';
import { PostItem } from '../../interfaces/PostInterfaces';
import { CustomButtonComponent } from '../../controls/custom-button/custom-button.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate/translate.pipe';

@Component({
    selector: 'app-news-summary',
    templateUrl: './news-summary.component.html',
    styleUrl: './news-summary.component.scss',
    imports: [CustomButtonComponent, RouterLink, AsyncPipe, TranslatePipe]
})
export class NewsSummaryComponent implements OnInit {
  protected readonly getNewsImage = getNewsImage

  protected news$!: Observable<PostItem[]>

  readonly text = {
    news: 'navigation.news',
    readMore: 'common.readMore'
  }

  private readonly newsService = inject(NewsService)

  ngOnInit() {
    this.news$ = this.newsService.getNews({ page: 0, size: 4 }).pipe(map(r => r.content));
  }

}
