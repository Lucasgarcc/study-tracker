import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit, Renderer2 } from '@angular/core';

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
export class SettingsPage implements OnInit {

    readonly appVersion = '0.0.1';
    readonly storageKey = 'study-tracker-preferences'; 

    private readonly fontScale  = { small: '0.9', medium: '1', large: '1.12' }
    private readonly root: HTMLElement;

    theme: ThemePreference = 'system';
    fontSize: FontSizePreference = 'medium';
    reducedMotion = false;

    /**
     * 
     * @param renderer 
     * @param document 
     */
    constructor(
        private readonly renderer: Renderer2,
        @Inject(DOCUMENT) private readonly document: Document
    ) {
        this.root = document.documentElement;
    }

    /**
     * 
     */
    ngOnInit(): void { 
        this.restorePreferences();
    };  

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

        theme === 'system' 
        ? this.renderer.removeAttribute(this.root, 'data-theme')
        : this.renderer.setAttribute(this.root, 'data-theme', theme);
        // Renderer2 receives the target element, attribute name, and value.
    
        this.savePreferences();
    }

    /**
     * 
     * @param value 
     */
    onThemeChange(value: string | number | undefined): void {
    
        if (value === 'light' 
            || value === 'dark' 
            || value === 'system'
        ) 
        this.setTheme(value);
    
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
        this.renderer.removeAttribute(this.root, 'data-theme');

        // HostBinding updates the font scale and motion class from the values above.
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
        } catch {
            localStorage.removeItem(this.storageKey);
        }
    
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
