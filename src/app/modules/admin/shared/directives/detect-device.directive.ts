import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDetectDevice]'
})
export class DetectDeviceDirective {

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(window.innerWidth <= 768){
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
}
