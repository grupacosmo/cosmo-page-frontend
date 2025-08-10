import { Component } from "@angular/core";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrl: "./about-us.component.scss",
  standalone: false,
})
export class AboutUsComponent {
  protected text = {
    title: "home.aboutUs",
    about: `home.aboutUsDescription`,
    meetOurTeam: "home.meetOurTeam",
  };

  protected sliderImages = [
    {
      src: "../../../../../assets/images/about-us-photo.jpg",
      alt: "About Us Photo 1",
      caption: "",
    },
    {
      src: "../../../../../assets/images/about-us-photo.jpg",
      alt: "About Us Photo 1",
      caption: "",
    },
    {
      src: "../../../../../assets/images/about-us-photo.jpg",
      alt: "About Us Photo 1",
      caption: "",
    },
    {
      src: "../../../../../assets/images/about-us-photo.jpg",
      alt: "About Us Photo 1",
      caption: "",
    },
  ];
}
