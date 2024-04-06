import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsArticleComponent } from './components/news-article/news-article.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '', 
        component: NewsListComponent
      },
      {
        path: ':slug',
        component: NewsArticleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
