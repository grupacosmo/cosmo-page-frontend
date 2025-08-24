import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './pages/team/team.component';

export const teamRoutes: Routes = [
  {
    path: '',
    component: TeamComponent
  }
];
