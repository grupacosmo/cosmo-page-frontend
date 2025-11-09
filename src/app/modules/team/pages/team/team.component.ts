import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { teams } from 'src/assets/data/team';
@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrl: './team.component.scss',
    imports: [NgClass]
})
export class TeamComponent {
    readonly activeTeam = signal(""); 

    readonly teamMembers = teams;

    scrollToTeam(teamId: string) {
        const el = document.getElementById(teamId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
}
