import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-custom-button',
    templateUrl: './custom-button.component.html',
    styleUrl: './custom-button.component.scss',
    imports: [NgClass]
})
export class CustomButtonComponent {

  @Input({ required: true })
  text!: string;

  @Input()
  backButton = false;

  @Input()
  isSecondaryButton = false;
}
