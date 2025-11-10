import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrl: './partners.component.scss',
    imports: [NgFor, TranslatePipe]
})
export class PartnersComponent {
  readonly text = {
    title: 'common.partners',
  }

  protected partners = [
    {
      src: '../../../../../assets/images/wiim-partner.png',
      link: 'https://it.pk.edu.pl/'
    },
    // {
    //   src: '../../../../../assets/images/baltic-sat-apps-logo.jpg',
    //   link: 'https://interreg-baltic.eu/project/balticsatapps/'
    // },
    // {
    //   src: '../../../../../assets/images/katedra-informatyki-logo.png',
    //   link: 'https://ii.pk.edu.pl/'
    // },
    {
      src: '../../../../../assets/images/lux-on-js-logo.jpeg',
      link: 'https://www.luxonis.com/'
    },
    {
      src: '../../../../../assets/images/future-lab-logo.png',
      link: 'https://futurelab.pk.edu.pl/?doing_wp_cron=1708354433.8955628871917724609375'
    },
    {
      src: '../../../../../assets/images/pk-logo.jpg',
      link: 'https://www.pk.edu.pl/index.php?lang=pl'
    },
    {
      src: '../../../../../assets/images/botland-logo.png',
      link: 'https://botland.com.pl/'
    }
  ]
}
