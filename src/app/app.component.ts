import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { scrollTop } from './shared/helpers/navigationHelpers';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [CoreModule, RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  isLoading = signal(true);

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {scrollTop(); this.isLoading.set(false)});
  }
  isAdminPanel() { 
    return this.router.url.includes("/admin");
  }
}
