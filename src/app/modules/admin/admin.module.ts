import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {HomeComponent} from "./pages/home/home.component";
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { AddPostComponent } from './pages/postComponents/add-post/add-post.component';
import { PostsManComponent } from './pages/postComponents/posts-man/posts-man.component';
import { TurnBurgerDirective } from './turn-burger.directive';
import { PostComponent } from './components/post/post.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PostsService } from './services/posts.service';
import { AddProjectComponent } from './pages/projectComponents/add-project/add-project.component';
import { ProjectsManComponent } from './pages/projectComponents/projects-man/projects-man.component';
import { AddAchievementComponent } from './pages/achievementsComponents/add-achievement/add-achievement.component';
import { AchievementsManComponent } from './pages/achievementsComponents/achievements-man/achievements-man.component';
import { TeamCheckboxComponent } from './pages/projectComponents/add-project/team-checkbox/team-checkbox.component';

@NgModule({
  declarations: [
      HomeComponent,
      SidebarComponent,
      AddPostComponent,
      PostsManComponent,
      TurnBurgerDirective,
      PostComponent,
      AchievementsComponent,
      ProjectsComponent,
      AddProjectComponent,
      ProjectsManComponent,
      AddAchievementComponent,
      AchievementsManComponent,
      TeamCheckboxComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
    PostsService
  ]
})
export class AdminModule { }
