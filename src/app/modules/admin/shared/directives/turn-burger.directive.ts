import { Directive, Host, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appTurnBurger]',
    standalone: false
})
export class TurnBurgerDirective {

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(window.innerWidth <= this.burgerBorder){
      this.toggleD = false;
      this.toggleM = true;
    }
    else{
      this.toggleM = false;
      this.toggleD = true;
    }
  }

  @HostBinding('class.mobile') toggleM: boolean = false;
  @HostBinding('class.desktop') toggleD: boolean = false;
  burgerBorder: number = 740;
}
