import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  protected text = {
    title: 'O nas',
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed, 
            rhoncus cursus dui. In non luctus ante. Aliquam vitae arcu euismod, volutpat erat nec,
            pulvinar ligula. Fusce purus elit, varius eu neque quis, eleifend porta leo.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin urna leo, vestibulum malesuada justo sed, 
            rhoncus cursus dui. In non luctus ante. Aliquam vitae arcu euismod, volutpat erat nec,
            pulvinar ligula. Fusce purus elit, varius eu neque quis, eleifend porta leo.`,
    meetOurTeam: 'Poznaj nasz zespół'
  }
}
