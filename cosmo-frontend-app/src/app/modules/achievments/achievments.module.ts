import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AchievmentsRoutingModule } from './achievments-routing.module';
import { AchievmentsComponent } from './pages/achievments/achievments.component';


@NgModule({
  declarations: [
    AchievmentsComponent
  ],
  imports: [
    CommonModule,
    AchievmentsRoutingModule
  ]
})
export class AchievmentsModule { }
