import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './pages/news/news.component';
import { MatCardModule } from '@angular/material/card';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    NewsComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatCardModule
  ]
})
export class NewsModule { }
