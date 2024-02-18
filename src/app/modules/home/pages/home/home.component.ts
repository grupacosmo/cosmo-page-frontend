import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected text = {
    description: 'Studenckie koło naukowe Politechniki Krakowskiej',
    joinUs: 'Dołącz do nas'
  }

  protected socialMedia = [
    {
      icon: 'fa fa-facebook',
      href: '',
    },
    {
      icon: 'fa fa-x-twitter',
      href: ''
    },
    {
      icon: 'fa fa-github',
      href: ''
    },
    {
      icon: 'fa fa-instagram',
      href: ''
    }
  ]
}
