import { Component } from '@angular/core';

// TODO
// REPLACE TEMPORTARY SOLUTION
const mediaPath = './../../../../../assets/images/social-media/';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  protected text = {
    news: 'Aktualności',
    newest: 'Najnowsze',
    links: 'Linki',
    homepage: 'Strona głowna',
    team: 'Zespół',
    projects: 'Projekty',
    achievments: 'Osiągnięcia',
    seeAlso: 'Zobacz też'
  }

  protected links = [
    {
      label: this.text.homepage,
      link: '/'
    },
    {
      label: this.text.news,
      link: '/news'
    },
    {
      label: this.text.team,
      link: '/team'
    },
    {
      label: this.text.projects,
      link: '/projects'
    },
    {
      label: this.text.achievments,
      link: '/achievments'
    }
  ]

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
