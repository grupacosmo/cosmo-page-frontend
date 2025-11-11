import { Routes } from '@angular/router';
import { AuthGuard } from './app/shared/services/Auth/auth-guard.service';
import { isDevMode } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./app/modules/home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./app/modules/projects/projects.routes').then((m) => m.adminRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./app/modules/admin/admin.routes').then((m) => m.adminRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./app/modules/team/team.routes').then((m) => m.teamRoutes),
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
      import('./app/modules/news/news.routes').then((m) => m.newsRoutes),
  },
  {
    path: 'achievments',
    loadChildren: () =>
      import('./app/modules/achievments/achievments.routes').then((m) => m.achievmentsRoutes),
  }
]

if (isDevMode()) {
  routes.splice(1, 0, ...devRoutes)
}

export const routeConfig = routes;
