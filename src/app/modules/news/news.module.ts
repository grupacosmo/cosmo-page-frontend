import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './pages/news/news.component';
import { MatCardModule } from '@angular/material/card';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsArticleComponent } from './components/news-article/news-article.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    NewsComponent,
    SidenavComponent,
    NewsListComponent,
    NewsArticleComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatCardModule,
    SharedModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class NewsModule { }
