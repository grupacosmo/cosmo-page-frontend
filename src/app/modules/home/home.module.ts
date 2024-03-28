import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { JoinUsComponent } from './components/join-us/join-us.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
    PartnersComponent,
    ProjectsComponent,
    JoinUsComponent
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
