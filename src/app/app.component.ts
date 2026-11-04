import { Component, HostBinding } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

    @HostBinding('class.ios-route-transitioning')
    isIosRouteTransitioning = false;

    /**
     * 
     * @param router 
     */
    constructor(router: Router) {
        if (Capacitor.getPlatform() === 'ios') {
        void StatusBar.setOverlaysWebView({ overlay: true })
            .then(() => StatusBar.setStyle({ style: Style.Light }))
            .catch(error => console.error('Unable to configure the iOS status bar.', error));

        router.events.pipe(
            filter(event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
            ),
            takeUntilDestroyed()
        ).subscribe(event => {
            this.isIosRouteTransitioning = event instanceof NavigationStart;
        });
        }
    }
}
