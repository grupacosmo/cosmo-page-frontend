import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './home-admin/admin.component';
import { AddPostComponent } from './components/postComponents/add-post/add-post.component';
import { PostsManComponent } from './components/postComponents/posts-man/posts-man.component';
import { AddProjectComponent } from './components/projectComponents/add-project/add-project.component';
import { ProjectsManComponent } from './components/projectComponents/projects-man/projects-man.component';
import { AddAchievementComponent } from './components/achievementsComponents/add-achievement/add-achievement.component';
import { AchievementsManComponent } from './components/achievementsComponents/achievements-man/achievements-man.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'addPost',
        component: AddPostComponent,
      },
      {
        path: 'postsMan',
        component: PostsManComponent,
      },
      {
        path: 'addProject',
        component: AddProjectComponent,
      },
      {
        path: 'projectsMan',
        component: ProjectsManComponent,
      },
      {
        path: 'addAchievements',
        component: AddAchievementComponent,
      },
      {
        path: 'achievementsMan',
        component: AchievementsManComponent,
      },
    ]
  }
];
