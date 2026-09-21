import { Component, Inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { scrollTop } from './shared/helpers/navigationHelpers';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  isLoading = signal(true);

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        scrollTop();
        this.isLoading.set(false);
        this.document.documentElement.classList.toggle('admin-route', this.isAdminPanel());
      });
  }
  isAdminPanel() {
    return this.router.url.includes("/admin");
  }
}
