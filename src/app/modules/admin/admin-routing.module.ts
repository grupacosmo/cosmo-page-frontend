import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddPostComponent } from './pages/postComponents/add-post/add-post.component';
import { PostsManComponent } from './pages/postComponents/posts-man/posts-man.component';
import { AddProjectComponent } from './pages/projectComponents/add-project/add-project.component';
import { ProjectsManComponent } from './pages/projectComponents/projects-man/projects-man.component';
import { AddAchievementComponent } from './pages/achievementsComponents/add-achievement/add-achievement.component';
import { AchievementsManComponent } from './pages/achievementsComponents/achievements-man/achievements-man.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
