import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ProjectCardInfo } from '../../models/project-card-info.model';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription, tap } from 'rxjs';
import { CustomButtonComponent } from '../../../../shared/controls/custom-button/custom-button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';;

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.scss',
    imports: [RouterLinkActive, RouterLink, CustomButtonComponent, TranslatePipe]
})
export class ProjectCardComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);

  private readonly breakpointObserver = inject(BreakpointObserver);

  @Input()
  project!: ProjectCardInfo;

  protected isMobile = false;

  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.breakpointObserver.observe(['(min-width: 768px)']).pipe(
        tap(res => {
          this.isMobile = !res.matches;
        })
      ).subscribe()
    ) 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected navigateToProject() {
    if (this.isMobile) return;
    this.router.navigate([`/projects/${this.project.id}`]);
  }
}
