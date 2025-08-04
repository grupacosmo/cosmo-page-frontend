import { Component } from '@angular/core';

// TODO
// REPLACE TEMPORTARY SOLUTION
const mediaPath = './../../../../../assets/images/social-media/';

// Currently unused
@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    standalone: false
})
export class SidenavComponent {
  readonly text = {
    news: 'navigation.news',
    newest: 'sidenav.newest',
    links: 'navigation.links',
    homepage: 'navigation.home',
    team: 'navigation.team',
    projects: 'navigation.projects',
    achievments: 'navigation.achievments',
    seeAlso: 'sidenav.seeAlso'
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
    // {
    //   label: this.text.team,
    //   link: '/team'
    // },
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
