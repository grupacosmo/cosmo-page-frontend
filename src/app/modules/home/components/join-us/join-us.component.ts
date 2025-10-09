import {Component} from '@angular/core';

@Component({
    selector: 'app-join-us',
    templateUrl: './join-us.component.html',
    styleUrl: './join-us.component.scss',
    standalone: false
})
export class JoinUsComponent {
    protected text = {
        joinCosmo: 'home.joinCosmo',
        summary: 'home.joinCosmoDescription',
        learnMore: 'common.fillForm',
    }

    protected openForm() {
        window.open('https://forms.gle/yzAawvpRiB8iofgM9', '_blank');
    }
}
