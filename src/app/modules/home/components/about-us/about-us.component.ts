import {Component} from '@angular/core';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss',
    imports: [TranslatePipe]
})
export class AboutUsComponent {
    readonly text = {
        title: 'home.aboutUs',
        about: `home.aboutUsDescription`,
        meetOurTeam: 'home.meetOurTeam',
    }
}
