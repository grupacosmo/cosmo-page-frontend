import { isDevMode, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/Auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

const devRoutes = [
 {
    path: 'news',
    loadChildren: () =>
      import('./modules/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./modules/team/team.module').then((m) => m.TeamModule),
  },
  {
    path: 'achievments',
    loadChildren: () =>
      import('./modules/achievments/achievments.module').then((m) => m.AchievmentsModule),
  }
]

if (isDevMode()) {
  routes.splice(1, 0, ...devRoutes)
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
