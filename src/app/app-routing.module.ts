import { isDevMode, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/Auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/projects/projects.routes').then((m) => m.adminRoutes),
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./modules/team/team.routes').then((m) => m.teamRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.routes').then((m) => m.adminRoutes),
    canActivate: [AuthGuard]
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
      import('./modules/news/news.routes').then((m) => m.newsRoutes),
  },
  {
    path: 'achievments',
    loadChildren: () =>
      import('./modules/achievments/achievments.routes').then((m) => m.achievmentsRoutes),
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
