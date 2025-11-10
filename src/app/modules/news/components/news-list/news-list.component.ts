import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { getNewsImage } from 'src/app/shared/helpers/imageHelper';
import { scrollTop } from 'src/app/shared/helpers/navigationHelpers';
import { PostItem } from 'src/app/shared/interfaces/PostInterfaces';
import { NewsService } from 'src/app/shared/services/news.service';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrl: './news-list.component.scss',
    imports: [RouterLink, MatPaginator, DatePipe, TruncatePipe]
})
export class NewsListComponent {
  protected newsItems: PostItem[] = [];

  protected newsItemsToDisplay: PostItem[] = []

  protected itemsPerPage = 6;

  protected pageIndex = 0;

  protected totalPages = 0;

  protected readonly getNewsImage = getNewsImage

  private subscription!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.subscription = this.newsService.getNews({ page: this.pageIndex, size: this.itemsPerPage }).subscribe(news => {
      this.newsItems = news.content
      this.totalPages = news.totalPages
      this.changePage(0);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changePage(pageIndex: number) {
    this.pageIndex = pageIndex;
    const displayIndexStart = pageIndex * this.itemsPerPage;
    const displayIndexEnd = displayIndexStart + this.itemsPerPage;

    this.newsItemsToDisplay = this.newsItems.slice(displayIndexStart, displayIndexEnd);
    scrollTop('smooth');
  }

}
