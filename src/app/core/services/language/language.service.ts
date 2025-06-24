import { Injectable, signal } from '@angular/core';
import { Language } from '../../models/language/language';
import { AVAILABLE_LANGUAGES } from '../../constants/available-languages';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    currentLanguage = signal<Language>(AVAILABLE_LANGUAGES[0]);
    dictionary = signal<Record<string, any> | null>(null);

    constructor() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            const language = AVAILABLE_LANGUAGES.find(lang => lang.code === savedLanguage);
            if (language) {
                this.currentLanguage.set(language);
            }
        }
        
        this.loadDictionary(this.currentLanguage().code);
    }

    setLanguage(languageCode: string): void {
        localStorage.setItem('language', languageCode);
        window.location.reload();
    }
    
    async loadDictionary(languageCode: string): Promise<void> {
        try {
            const dictionary = await import(`../../../../assets/i18n/resources.${languageCode}.json`);
            this.dictionary.set(dictionary);
        } catch (error) {
            console.error('Error loading language dictionary:', error);
            this.dictionary.set({});
        }
    }

    translate(key: string): string {
        if (!key) return '';
        
        if (this.dictionary() === null) {
            return key;
        }
        
        const keys = key.split('.');
        let value = this.dictionary();
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }
        
        return typeof value === 'string' ? value : key;
    }
}
