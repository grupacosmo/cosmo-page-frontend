import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language/language.service';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { Language } from '../../models/language/language';
import { AVAILABLE_LANGUAGES } from '../../constants/available-languages';
import { TranslatePipe } from 'src/app/shared/pipes/translate/translate.pipe';

@Component({
    selector: 'app-language-picker',
    imports: [CommonModule, ClickOutsideDirective, TranslatePipe],
    templateUrl: './language-picker.component.html',
    styleUrl: './language-picker.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagePickerComponent {
  readonly isOpen = signal<boolean>(false);
  readonly languages = signal<Language[]>(AVAILABLE_LANGUAGES);
  readonly currentLanguage: WritableSignal<Language>;
  readonly isChangingLanguage = signal<boolean>(false);

  constructor(private languageService: LanguageService) {
    this.currentLanguage = this.languageService.currentLanguage;
  }

  toggleDropdown(): void {
    this.isOpen.set(!this.isOpen());
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectLanguage(language: Language): void {
    if (language.code !== this.currentLanguage().code) {
      this.isChangingLanguage.set(true);
      this.isOpen.set(false);
      this.languageService.setLanguage(language.code);
    } else {
      this.closeDropdown();
    }
  }
}
