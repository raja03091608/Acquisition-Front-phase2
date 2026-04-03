import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  Clipboard,
  ClipboardCheck,
  LucideAngularModule,
  ShipIcon,
} from 'lucide-angular';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTooltip,
  NgApexchartsModule,
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [
    // NgFor, 
    NgApexchartsModule, LucideAngularModule],
  templateUrl: './dashboard-charts.component.html',
})
export class DashboardChartsComponent {
  readonly ShipIcon = ShipIcon;
  readonly clipBoardCheck = ClipboardCheck;

  // ---------------- Dockyard Bar Chart ----------------
  dockyardSeries: ApexAxisChartSeries = [
    { name: 'Pending', data: [12, 18, 9, 14, 11] },
    { name: 'Approved', data: [20, 24, 18, 22, 19] },
    { name: 'Rejected', data: [4, 3, 6, 2, 5] },
  ];

  dockyardChart: ApexChart = {
    type: 'bar',
    height: 300,
    stacked: false,
  };

  dockyardXAxis: ApexXAxis = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  };

  dockyardColors = ['#f59e0b', '#22c55e', '#ef4444'];

  dockyardPlotOptions: ApexPlotOptions = {
    bar: {
      borderRadius: 4,
      columnWidth: '50%',
    },
  };

  dockyardTooltip: ApexTooltip = {
    shared: true,
  };

  // ---------------- Survey Pie Chart ----------------
  surveySeries: ApexNonAxisChartSeries = [45, 35, 20];

  surveyLabels = ['Completed', 'In Progress', 'Pending'];

  surveyColors = ['#22c55e', '#3b82f6', '#f59e0b'];

  surveyChart: ApexChart = {
    type: 'donut',
    height: 300,
  };

  surveyLegend: ApexLegend = {
    position: 'bottom',
  };

  surveyResponsive: ApexResponsive[] = [
    {
      breakpoint: 768,
      options: {
        chart: { height: 250 },
      },
    },
  ];
}
