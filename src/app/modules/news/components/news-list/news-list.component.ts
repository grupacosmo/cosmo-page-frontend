import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { getNewsImage } from 'src/app/shared/helpers/imageHelper';
import { scrollTop } from 'src/app/shared/helpers/navigationHelpers';
import { NewsItem } from 'src/app/shared/models/news';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
  protected newsItems: NewsItem[] = [];

  protected newsItemsToDisplay: NewsItem[] = []

  protected itemsPerPage = 6;

  protected text = {
    readMore: 'Czytaj dalej'
  }

  protected readonly getNewsImage = getNewsImage

  private subscription!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.subscription = this.newsService.getNews().subscribe(news => {
      this.newsItems = news
      this.changePage(0);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changePage(pageIndex: number) {
    const displayIndexStart = pageIndex * this.itemsPerPage;
    const displayIndexEnd = displayIndexStart + this.itemsPerPage;

    this.newsItemsToDisplay = this.newsItems.slice(displayIndexStart, displayIndexEnd);
    scrollTop('smooth');
  }

}
