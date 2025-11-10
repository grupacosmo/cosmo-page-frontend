import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../../core/services/language/language.service';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform {
    private readonly languageService = inject(LanguageService);

    transform(key?: string): string {
    return this.languageService.translate(key);
    }
}
