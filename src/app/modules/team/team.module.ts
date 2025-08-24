import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './pages/team/team.component';


@NgModule({
    imports: [
        CommonModule,
        TeamRoutingModule,
        TeamComponent
    ]
})
export class TeamModule { }
