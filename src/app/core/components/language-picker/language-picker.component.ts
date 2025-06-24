import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language/language.service';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { Language } from '../../models/language/language';
import { AVAILABLE_LANGUAGES } from '../../constants/available-languages';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './language-picker.component.html',
  styleUrl: './language-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagePickerComponent {
  readonly isOpen = signal<boolean>(false);
  readonly languages = signal<Language[]>(AVAILABLE_LANGUAGES);
  readonly currentLanguage: WritableSignal<Language>;

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
    this.languageService.setLanguage(language.code);
    this.closeDropdown();
  }
}
