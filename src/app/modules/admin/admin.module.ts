import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./home-admin/admin.component";
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { AddPostComponent } from './pages/postComponents/add-post/add-post.component';
import { PostsManComponent } from './pages/postComponents/posts-man/posts-man.component';
import { TurnBurgerDirective } from './shared/directives/turn-burger.directive';
import { PostComponent } from './pages/postComponents/post/post.component';
import { PostsService } from './shared/services/posts.service';
import { AddProjectComponent } from './pages/projectComponents/add-project/add-project.component';
import { ProjectsManComponent } from './pages/projectComponents/projects-man/projects-man.component';
import { AddAchievementComponent } from './pages/achievementsComponents/add-achievement/add-achievement.component';
import { AchievementsManComponent } from './pages/achievementsComponents/achievements-man/achievements-man.component';
import { TeamCheckboxComponent } from './pages/projectComponents/add-project/team-checkbox/team-checkbox.component';

@NgModule({
  declarations: [
      AdminComponent,
      SidebarComponent,
      AddPostComponent,
      PostsManComponent,
      TurnBurgerDirective,
      PostComponent,
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
