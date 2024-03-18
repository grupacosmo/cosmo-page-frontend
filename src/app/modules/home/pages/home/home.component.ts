import { Component } from '@angular/core';

// TODO
// REPLACE TEMPORTARY SOLUTION
const mediaPath = './../../../../../assets/images/social-media/';


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
      icon: 'facebook',
      href: 'https://www.facebook.com/cosmopk.kn',
      src: mediaPath + 'fb.png',
    },
    {
      icon: 'x-twitter',
      href: 'https://twitter.com/pkcosmopk',
      src: mediaPath + 'x.png',
    },
    {
      icon: 'github',
      href: 'https://github.com/grupacosmo',
      src: mediaPath + 'gh.png',
    },
    {
      icon: 'instagram',
      href: 'https://www.instagram.com/cosmopk_kn/',
      src: mediaPath + 'ig.png',
    }
  ]
}
