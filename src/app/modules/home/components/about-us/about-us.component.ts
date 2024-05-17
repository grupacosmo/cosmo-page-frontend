import {Component} from '@angular/core';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
    protected text = {
        title: 'O nas',
        about: `Jesteśmy grupą studentów, z różnych wydziałów, z różnymi umiejętnościami, których łączy jedno –
zainteresowanie kosmosem. Działamy na Politechnice Krakowskiej od 2019 roku, mamy za sobą
zrealizowane projekty i plany na realizację kolejnych. Obecnie zajmujemy się budową pierwszej
rakiety sondującej, drona szybowcowego oraz projektujemy komputerową grę edukacyjną.`,
        meetOurTeam: 'Poznaj nasz zespół'
    }
}
