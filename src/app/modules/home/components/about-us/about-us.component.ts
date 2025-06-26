import {Component} from '@angular/core';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
    protected text = {
        title: 'home.aboutUs',
        about: `home.aboutUsDescription`,
        meetOurTeam: 'home.meetOurTeam',
    }
}
