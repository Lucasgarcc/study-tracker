import { DOCUMENT } from '@angular/common';
import { Component, Host, HostBinding, Inject, Renderer2 } from '@angular/core';

/**
 *  Tipage for the settings preferences stored in localStorage
 */
type ThemePreference = 'system' | 'light' | 'dark';
type FontSizePreference = 'small' | 'medium' | 'large';

/**
 * Interface for the settings preferences stored in localStorage
 */
interface SettingsPreferences {
  theme: ThemePreference;
  fontSize: FontSizePreference;
  reducedMotion: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: false,
})
export class SettingsPage {

    readonly appVersion = '0.0.1';
    readonly storageKey = 'study-tracker-preferences';
    theme: ThemePreference = 'system';
    fontSize: FontSizePreference = 'medium';
    reducedMotion = false;
    private readonly fontScale  = { small: '0.9', medium: '1', large: '1.12' }
   
    constructor(
        private readonly Renderer: Renderer2,
        @Inject(DOCUMENT) private readonly Document: Document
    ) {};

    ngOnInit(): void { this.restorePreferences(); }

    /**
     * bind the font scale to the root element based on the selected font size
     */
    @HostBinding('style.--orbit-font-scale')
    get orbitFontScale(): string {
        return this.fontScale[this.fontSize];
    }

    /**
     *  bind the reduce-motion class to the host element based on the reducedMotion preference
     */
    @HostBinding('class.reduce-motion')
    get reduceMotionClass(): boolean {
        return this.reducedMotion;
    }

    /**
     * 
     * @param theme 
     */
    setTheme(theme: ThemePreference): void {
        this.theme = theme;

        if (theme === 'system') {
            this.Document.documentElement.removeAttribute('data-theme');
        } else {
            this.Document.documentElement.setAttribute('data-theme', theme);
        }
        this.savePreferences();
    }

    /**
     * 
     * @param value 
     */
    onThemeChange(value: string | number | undefined): void {
        if (value === 'light' || value === 'dark' || value === 'system') this.setTheme(value);
    }

    /**
     * 
     * @param fontSize 
     */
    setFontSize(fontSize: FontSizePreference): void {
        this.fontSize = fontSize;
        this.savePreferences();
    }

    /**
     * 
     * @param value 
     */
    setReducedMotion(value: boolean): void {
        this.reducedMotion = value;
        this.savePreferences();
    }

    /**
     * 
     */
    resetPreferences(): void {
        this.theme = 'system';
        this.fontSize = 'medium';
        this.reducedMotion = false;
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.style.setProperty('--orbit-font-scale', '1');
        document.documentElement.classList.remove('reduce-motion');
        localStorage.removeItem(this.storageKey);
    }

    /**
     * 
     * @returns 
     */
    private restorePreferences(): void {
        const stored = localStorage.getItem(this.storageKey);
        if (!stored) return;
        try {
        const preferences = JSON.parse(stored) as Partial<SettingsPreferences>;
        this.theme = preferences.theme ?? 'system';
        this.fontSize = preferences.fontSize ?? 'medium';
        this.reducedMotion = preferences.reducedMotion ?? false;
        this.setTheme(this.theme);
        this.setFontSize(this.fontSize);
        this.setReducedMotion(this.reducedMotion);
        } catch { localStorage.removeItem(this.storageKey); }
    }

    /**
     * 
     */
    private savePreferences(): void {
        localStorage.setItem(this.storageKey, JSON.stringify({
        theme: this.theme, fontSize: this.fontSize, reducedMotion: this.reducedMotion
        } satisfies SettingsPreferences));
    }

}
