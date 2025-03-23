import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'westgate-website';

  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') ||
           currentRoute.includes('/forgot') ||
           currentRoute.includes('/reset');
  }
}
