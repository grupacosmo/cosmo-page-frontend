import {Component} from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/controls/custom-button/custom-button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-join-us',
    templateUrl: './join-us.component.html',
    styleUrl: './join-us.component.scss',
    imports: [CustomButtonComponent, TranslatePipe]
})
export class JoinUsComponent {
    readonly text = {
        joinCosmo: 'home.joinCosmo',
        summary: 'home.joinCosmoDescription',
        learnMore: 'common.fillForm',
    }

    protected openForm() {
        window.open('https://forms.gle/yzAawvpRiB8iofgM9', '_blank');
    }
}
