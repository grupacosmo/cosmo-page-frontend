import { Component, ElementRef, isDevMode, ViewChild } from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/controls/custom-button/custom-button.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { NewsSummaryComponent } from '../../../../shared/components/news-summary/news-summary.component';
import { ProjectsHomeComponent } from '../../components/projects/projects-home.component';
import { JoinUsComponent } from '../../components/join-us/join-us.component';
import { PartnersComponent } from '../../components/partners/partners.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

// TODO
// REPLACE TEMPORTARY SOLUTION
const mediaPath = './../../../../../assets/images/social-media/';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CustomButtonComponent, AboutUsComponent, NewsSummaryComponent, ProjectsHomeComponent, JoinUsComponent, PartnersComponent, TranslatePipe]
})
export class HomeComponent {
  @ViewChild('joinUsSection', { static: true }) joinUsSection!: ElementRef;

  readonly text = {
    description: 'home.name',
    joinUs: 'home.joinUs'
  }

  readonly isDevMode = isDevMode;

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

  protected scrollToJoinUs() {
    console.log(this.joinUsSection)
    const el = this.joinUsSection.nativeElement;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
