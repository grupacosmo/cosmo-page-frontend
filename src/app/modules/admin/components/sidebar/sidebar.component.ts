import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SidebarElementsService } from './sidebar-elements.service';
import { SidebarItemComponent } from './sidebar-components/sidebar-item/sidebar-item.component';

type SidebarElement = {
  title: string;
  icon: string;
  link: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [MatListModule, SidebarItemComponent],
})
export class SidebarComponent implements OnInit {
  protected sidebarElements: SidebarElement[] = [];

  constructor(
    private readonly sidebarElementsService: SidebarElementsService,
  ) {}

  ngOnInit(): void {
    this.sidebarElements = this.sidebarElementsService.getSidebarElements();
  }
}



