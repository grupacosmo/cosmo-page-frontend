import {Component} from '@angular/core';

@Component({
    selector: 'app-join-us',
    templateUrl: './join-us.component.html',
    styleUrl: './join-us.component.scss'
})
export class JoinUsComponent {
    protected text = {
        joinCosmo: 'DOŁĄCZ DO COSMO PK',
        summary: 'Jeśli chcesz się przyłączyć do jednego z naszych projektów lub masz własny pomysł, wyślij nam swoje zgłoszenie – odezwiemy się do Ciebie',
        learnMore: 'Wypełnij formularz',
    }

    protected openForm() {
        window.open('https://forms.gle/18KxKvX6rkyzu6cJA', '_blank');
    }
}
