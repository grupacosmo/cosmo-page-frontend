import { Component, ElementRef, HostBinding, HostListener} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(){}

  public path: string = "../../../../../assets/";
  windowWidth: number = window.innerWidth;
  display: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  onRouterLinkActive($event: boolean) {
    console.log($event);
  }
  
  onClick(){
    this.display = !this.display;
  }
}
