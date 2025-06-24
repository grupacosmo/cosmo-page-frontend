import { Injectable, signal } from '@angular/core';
import { Language } from '../../models/language/language';
import { AVAILABLE_LANGUAGES } from '../../constants/available-languages';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    currentLanguage = signal<Language>(AVAILABLE_LANGUAGES[0]);

    constructor() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            const language = AVAILABLE_LANGUAGES.find(lang => lang.code === savedLanguage);
            if (language) {
                this.currentLanguage.set(language);
            }
        }
    }

    setLanguage(languageCode: string): void {
        const language = AVAILABLE_LANGUAGES.find(lang => lang.code === languageCode);
        if (language) {
            this.currentLanguage.set(language);
            localStorage.setItem('language', languageCode);
        }
    }

    getCurrentLanguage(): Language {
        return this.currentLanguage();
    }
    
    getCurrentLanguageValue(): Language {
        return this.currentLanguage();
    }
}
