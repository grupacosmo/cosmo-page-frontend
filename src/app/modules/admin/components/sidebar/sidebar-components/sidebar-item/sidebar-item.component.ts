import { Component, Input } from '@angular/core';
import { Link } from 'src/app/modules/admin/shared/interfaces/SidebarInterfaces';
import { NgFor } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrl: './sidebar-item.component.scss',
    imports: [NgFor, RouterLinkActive, RouterLink]
})  

export class SidebarItemComponent{
  @Input({ required: true }) icon: string = ""; 
  @Input({ required: true }) title: string = ""; 
  @Input({ required: true }) links: Link[] = []; 
}
