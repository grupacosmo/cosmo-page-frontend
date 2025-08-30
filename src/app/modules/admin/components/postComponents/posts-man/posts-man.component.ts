import { Component, inject } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';;
import { PostItem } from 'src/app/shared/interfaces/PostInterfaces';

@Component({
    selector: 'app-posts-man',
    templateUrl: './posts-man.component.html',
    styleUrl: './posts-man.component.scss',
    standalone: false
})

export class PostsManComponent {
  private newsService = inject(NewsService);
  protected newsItemsToDisplay: PostItem[] = []
  protected pageIndex = 0;
  protected itemsPerPage = 6;
  protected totalElements = 0;

  constructor(){}

  ngOnInit(){
    this.newsService.getNews({ page: this.pageIndex, size: this.itemsPerPage }).subscribe(news => {
      this.newsItemsToDisplay = news.content;
      this.totalElements = news.totalElements;
          console.log(this.newsItemsToDisplay);
    });
    
  }

  changePage(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.newsService.getNews({ page: this.pageIndex, size: this.itemsPerPage }).subscribe(news => {
      this.newsItemsToDisplay = news.content;
      this.totalElements = news.totalElements;
    });
  }
}
