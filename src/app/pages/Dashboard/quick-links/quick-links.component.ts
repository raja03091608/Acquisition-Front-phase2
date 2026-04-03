import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import {
  ChartBar,
  File,
  List,
  LucideAngularModule,
  Ship,
  Ticket,
} from 'lucide-angular';

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [NgFor, LucideAngularModule, NgFor, NgClass],
  templateUrl: './quick-links.component.html',
})
export class QuickLinksComponent {
  readonly ChartIcon = ChartBar;
  readonly ticketIcon = Ticket;
  readonly listIcon = List;
  readonly shipIcon = Ship;
  readonly fileIcon = File;

  //  icon: this.ShipIcon
  sidebarItems = [
    { title: 'Tickets', icon: this.ticketIcon, path: '/app/tickets' },
    {
      title: 'Task Management',
      icon: this.listIcon,
      path: '/app/task-management',
    },
    { title: 'Hitu Module', icon: this.shipIcon, path: '/app/hitu' },
    { title: 'Ship Operations', icon: this.shipIcon, path: '/app/ship' },
    { title: 'HVAC Report', icon: this.fileIcon, path: '/app/hvac-report' },
  ];

  pastelColors = [
    'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800',
    'bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800',
    'bg-pink-50 text-pink-700 hover:bg-pink-100 hover:text-pink-800',
    'bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800',
    'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800',
  ];

  quickLinks = this.sidebarItems.slice(0, 5);

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
