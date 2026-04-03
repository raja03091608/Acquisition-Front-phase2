import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { Router } from '@angular/router';
// import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './quick-links.component.html',
})
export class QuickLinksComponent {
  sidebarItems = [
    { title: 'Tickets', icon: 'ticket', path: '/app/tickets' },
    {
      title: 'Task Management',
      icon: 'clipboard-check',
      path: '/app/task-management',
    },
    { title: 'Hitu Module', icon: 'file-text', path: '/app/hitu' },
    { title: 'Ship Operations', icon: 'ship', path: '/app/ship' },
    { title: 'HVAC Report', icon: 'bar-chart-3', path: '/app/hvac-report' },
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
