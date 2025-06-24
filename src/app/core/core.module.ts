import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    LanguagePickerComponent
  ]
})
export class CoreModule { }
