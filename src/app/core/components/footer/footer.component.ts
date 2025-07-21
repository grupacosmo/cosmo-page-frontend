import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [CommonModule, RouterModule, TranslatePipe]
})
export class FooterComponent {

  protected columns = [
    {
      header: 'navigation.links',
      links: [
        {
          name: 'navigation.home',
          link: '/',
          external: false
        },
        {
          name: 'navigation.news',
          link: '/news',
          external: false
        },
        {
          name: 'navigation.team',
          link: '/team',
          external: false
        },
        {
          name: 'navigation.projects',
          link: '/projects',
          external: false
        },
        {
          name: 'navigation.achievements',
          link: '/achievments',
          external: false
        },
      ].filter((c) => !['/achievments', '/news'].includes(c.link) )
    },
    {
      header: 'footer.followUs',
      links: [
        {
          name: 'Facebook',
          link: 'https://www.facebook.com/cosmopk.kn',
          external: true
        },
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/cosmopk_kn/',
          external: true
        },
        {
          name: 'Twitter',
          link: 'https://twitter.com/home',
          external: true
        },
      ]
    },
    {
      header: 'footer.contactUs',
      links: [
        {
          name: 'kolocosmopk@gmail.com',
          link: '#',
          external: false
        },
        {
          name: 'Warszawska 24, Kraków',
          link: '#',
          external: false
        }
      ]
    }
  ];
}
