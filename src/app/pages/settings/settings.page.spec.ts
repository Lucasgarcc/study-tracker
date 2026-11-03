import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SettingsPage } from './settings.page';

describe('SettingsPage', () => {
    let component: SettingsPage;
    let fixture: ComponentFixture<SettingsPage>;
    let root: HTMLElement;
    let originalTheme: string | null;
    let originalPreferences: string | null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [SettingsPage],
        imports: [IonicModule.forRoot(), FormsModule, ExploreContainerComponentModule]
        }).compileComponents();

            root = TestBed.inject(DOCUMENT).documentElement;
            originalTheme = root.getAttribute('data-theme');
            originalPreferences = localStorage.getItem('study-tracker-preferences');
            localStorage.removeItem('study-tracker-preferences');
            fixture = TestBed.createComponent(SettingsPage);
            component = fixture.componentInstance;
            fixture.detectChanges();
    });

    afterEach(() => {
        if (originalTheme === null) root.removeAttribute('data-theme');
        else root.setAttribute('data-theme', originalTheme);
        if (originalPreferences === null) localStorage.removeItem(component.storageKey);
        else localStorage.setItem(component.storageKey, originalPreferences);
    });

    it('applies explicit themes to html and removes the override for system', () => {
        component.setTheme('dark');
        expect(root.getAttribute('data-theme')).toBe('dark');
        component.setTheme('light');
        expect(root.getAttribute('data-theme')).toBe('light');
        component.setTheme('system');
        expect(root.hasAttribute('data-theme')).toBeFalse();
    });

    it('updates the motion host binding and resets preferences', () => {
        component.setTheme('light');
        component.setFontSize('large');
        component.setReducedMotion(true);
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        expect(host.classList.contains('reduce-motion')).toBeTrue();
        expect(host.style.getPropertyValue('--orbit-font-scale')).toBe('1.12');

        component.resetPreferences();
        fixture.detectChanges();
        expect(root.hasAttribute('data-theme')).toBeFalse();
        expect(host.classList.contains('reduce-motion')).toBeFalse();
        expect(host.style.getPropertyValue('--orbit-font-scale')).toBe('1');
        expect(localStorage.getItem(component.storageKey)).toBeNull();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
