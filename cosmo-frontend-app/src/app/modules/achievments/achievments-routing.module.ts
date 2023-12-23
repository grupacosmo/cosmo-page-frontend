import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievmentsComponent } from './pages/achievments/achievments.component';

const routes: Routes = [
  {
    path: '',
    component: AchievmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievmentsRoutingModule { }
