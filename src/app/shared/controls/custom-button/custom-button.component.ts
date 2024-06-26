import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {

  @Input({ required: true })
  text!: string;

  @Input()
  backButton = false;

  @Input()
  isSecondaryButton = false;
}
