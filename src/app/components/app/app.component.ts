import { Component } from '@angular/core';
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from '@angular/router';

@Component({
  selector: 'art-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isLoading = true;
  hasError = false;

  constructor(router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          this.hasError = false;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel: {
          this.isLoading = false;
          break;
        }

        case event instanceof NavigationError: {
          this.isLoading = false;
          this.hasError = true;
        }

        default: {
          break;
        }
      }
    });
  }
}
