import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NewsSummaryComponent } from './components/news-summary/news-summary.component';

@NgModule({
  declarations: [
    HomeComponent,
    NewsSummaryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    SharedModule,
    MatCardModule,
    MatIconModule
  ]
})
export class HomeModule { }
