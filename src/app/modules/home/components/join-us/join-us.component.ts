import { Component } from '@angular/core';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.scss'
})
export class JoinUsComponent {
  protected text = {
    joinCosmo: 'DOŁĄCZ DO COSMO PK',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed.',
    learnMore: 'Dowiedz się więcej'
  }
}
