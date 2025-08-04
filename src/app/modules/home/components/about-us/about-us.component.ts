import {Component} from '@angular/core';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss',
    standalone: false
})
export class AboutUsComponent {
    readonly text = {
        title: 'home.aboutUs',
        about: `home.aboutUsDescription`,
        meetOurTeam: 'home.meetOurTeam',
    }
}
