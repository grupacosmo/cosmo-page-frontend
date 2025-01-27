import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { scrollTop } from './shared/helpers/navigationHelpers';
import { CoreModule } from './core/core.module';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [NgIf, CoreModule, RouterOutlet]
})
export class AppComponent {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => scrollTop());
  }
  isAdminPanel() { 
    return this.router.url.includes("/admin");
  }
}
