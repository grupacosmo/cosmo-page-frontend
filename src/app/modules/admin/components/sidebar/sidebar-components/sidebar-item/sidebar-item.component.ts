import { Component, Input } from '@angular/core';
import { Link } from 'src/app/modules/admin/shared/interfaces/SidebarInterfaces';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})  

export class SidebarItemComponent{
  @Input({ required: true }) icon: string = ""; 
  @Input({ required: true }) title: string = ""; 
  @Input({ required: true }) links: Link[] = []; 
}
