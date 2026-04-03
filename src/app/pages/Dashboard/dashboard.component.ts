import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  Activity,
  AlertTriangle,
  CircleCheck,
  Clock,
  Database,
  LucideAngularModule,
  Ship,
} from 'lucide-angular';
// import { QuickLinksComponent } from './quick-links/quick-links.component';
// import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    // QuickLinksComponent,
    // DashboardChartsComponent,
    // NgFor,
    // NgClass,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly ActivityIcon = Activity;
  dockyardData = [
    { name: 'Jan', pending: 12, approved: 28, rejected: 3 },
    { name: 'Feb', pending: 8, approved: 35, rejected: 2 },
    { name: 'Mar', pending: 15, approved: 22, rejected: 5 },
    { name: 'Apr', pending: 10, approved: 30, rejected: 1 },
  ];

  // Survey status data
  surveyStatusData = [
    { name: 'Completed', value: 65, color: '#22c55e' },
    { name: 'In Progress', value: 25, color: '#f59e0b' },
    { name: 'Overdue', value: 10, color: '#ef4444' },
  ];

  quickStats = [
    {
      title: 'Active Ships',
      value: '142',
      change: '+5 from last month',
      icon: Ship,
      variant: 'default',
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-8 from last week',
      icon: Clock,
      variant: 'warning',
    },
    {
      title: 'Completed Surveys',
      value: '89%',
      change: '+12% from last quarter',
      icon: CircleCheck,
      variant: 'success',
    },
    {
      title: 'Critical Issues',
      value: '7',
      change: 'Requires immediate attention',
      icon: AlertTriangle,
      variant: 'destructive',
    },
  ];

  activities = [
    {
      action: 'Dockyard plan approved',
      ship: 'INS Vikrant',
      time: '2 hours ago',
      type: 'approved',
    },
    {
      action: 'Hull survey completed',
      ship: 'INS Shivalik',
      time: '4 hours ago',
      type: 'completed',
    },
    {
      action: 'Critical defect reported',
      ship: 'INS Kolkata',
      time: '6 hours ago',
      type: 'critical',
    },
    {
      action: 'Equipment inspection due',
      ship: 'INS Chennai',
      time: '1 day ago',
      type: 'due',
    },
  ];

  getCardBg(variant: string): string {
    switch (variant) {
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'destructive':
        return 'bg-red-50';
      default:
        return 'bg-blue-50';
    }
  }

  getIconColor(variant: string): string {
    switch (variant) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'destructive':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  }

  getBadgeClass(type: string): string {
    switch (type) {
      case 'approved':
        return 'bg-blue-600 text-white';
      case 'completed':
        return 'bg-gray-200 text-gray-900';
      case 'critical':
        return 'bg-red-600 text-white';
      default:
        return 'border border-gray-300 text-gray-600';
    }
  }
}
