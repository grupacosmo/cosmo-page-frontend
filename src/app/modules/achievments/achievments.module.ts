import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { AchievmentsRoutingModule } from './achievments-routing.module';
import { AchievmentsComponent } from './pages/achievments/achievments.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AchievmentDetailsDialogComponent } from './components/achievment-details-dialog/achievment-details-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AchievmentsComponent,
    AchievmentDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AchievmentsRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule
  ]
})
export class AchievmentsModule { }
