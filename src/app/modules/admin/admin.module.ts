import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./home-admin/admin.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddPostComponent } from './components/postComponents/add-post/add-post.component';
import { PostsManComponent } from './components/postComponents/posts-man/posts-man.component';
import { TurnBurgerDirective } from './shared/directives/turn-burger.directive';
import { PostComponent } from './components/postComponents/post/post.component';
import { AddProjectComponent } from './components/projectComponents/add-project/add-project.component';
import { ProjectsManComponent } from './components/projectComponents/projects-man/projects-man.component';
import { AddAchievementComponent } from './components/achievementsComponents/add-achievement/add-achievement.component';
import { AchievementsManComponent } from './components/achievementsComponents/achievements-man/achievements-man.component';
import { TeamCheckboxComponent } from './components/projectComponents/add-project/team-checkbox/team-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './components/projectComponents/project/project.component';
import { SidebarItemComponent } from './components/sidebar/sidebar-components/sidebar-item/sidebar-item.component';
import { SidebarBurgerItemComponent } from './components/sidebar/sidebar-components/sidebar-burger-item/sidebar-burger-item.component';
import { EditPostDialogComponent } from './components/edit-dialogs/edit-post-dialog/edit-post-dialog.component';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

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
      ProjectComponent,
      SidebarItemComponent,
      SidebarBurgerItemComponent,
      EditPostDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  providers: []
})
export class AdminModule { }
