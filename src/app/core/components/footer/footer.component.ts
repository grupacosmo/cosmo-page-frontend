import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  protected columns = [
    {
      header: 'Linki',
      links: [
        {
          name: 'Strona główna',
          link: '/',
          external: false
        },
        {
          name: 'Aktualności',
          link: '/news',
          external: false
        },
        {
          name: 'Zespół',
          link: '/team',
          external: false
        },
        {
          name: 'Projekty',
          link: '/projects',
          external: false
        },
        {
          name: 'Osiągnięcia',
          link: '/achievments',
          external: false
        },
      ].filter((c) => !['/achievments', '/news'].includes(c.link) )
    },
    {
      header: 'Social media',
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
      header: 'Kontakt',
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
