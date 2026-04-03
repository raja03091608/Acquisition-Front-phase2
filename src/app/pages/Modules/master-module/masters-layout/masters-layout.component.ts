import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  Database, Search, Bell, Settings,
  Terminal, Layers, Grid2x2, Building2, Tag, Package,
  Globe, Activity, Briefcase, Truck, Folder, Cpu,
  FileText, Wrench, Hash, ChevronLeft, ChevronRight
} from 'lucide-angular';

@Component({
  selector: 'app-masters-layout',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './masters-layout.component.html',
  styleUrls: ['./masters-layout.component.css']
})
export class MastersLayoutComponent implements AfterViewInit {

  @ViewChild('tabContainer', { static: false }) tabContainer!: ElementRef;

  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;

  canScrollLeft = false;
  canScrollRight = true;

  ngAfterViewInit() {
    this.checkScroll();
  }

  scrollTabs(direction: 'left' | 'right') {
    const el = this.tabContainer.nativeElement;

    el.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll(), 300);
  }

  checkScroll() {
    const el = this.tabContainer.nativeElement;

    this.canScrollLeft = el.scrollLeft > 0;
    this.canScrollRight = el.scrollLeft < (el.scrollWidth - el.clientWidth);
  }

  tabs = [
    { label: 'Commands', path: 'commands', icon: Terminal },
    { label: 'Units', path: 'units', icon: Layers },
    { label: 'Compartments', path: 'compartments', icon: Grid2x2 },
    { label: 'Directorate', path: 'directorate-master', icon: Building2 },
    { label: 'Class', path: 'class', icon: Tag },
    { label: 'Sub Module', path: 'sub-module', icon: Package },
    { label: 'Global Section', path: 'global-section', icon: Globe },
    { label: 'Global Sub Section', path: 'global-sub-section', icon: Globe },
    { label: 'Global Sub Sub Section', path: 'global-sub-sub-section', icon: Globe },
    { label: 'Status', path: 'status', icon: Activity },
    { label: 'Project Type', path: 'project-type', icon: Briefcase },
    { label: 'Vendors', path: 'vendors', icon: Truck },
    { label: 'Projects', path: 'projects', icon: Folder },
    { label: 'ILMS Equipment', path: 'ilms-equipment', icon: Cpu },
    { label: 'SOTR Type', path: 'sotr-type-master', icon: FileText },
    { label: 'Equipment', path: 'equipment', icon: Wrench },
    { label: 'Ship Master', path: 'ship-master', icon: Database },
    { label: 'SSS Section', path: 'sss-section', icon: Layers },
    { label: 'System', path: 'system', icon: Cpu },
    { label: 'Reference Docs', path: 'kmc', icon: Database },
    { label: 'Commenter Moderator', path: 'commenter-modretor', icon: Settings },
    { label: 'UIG Numbers', path: 'uig-numbers', icon: Hash },
    { label: 'ILMS Spars', path: 'ilms-spars', icon: Wrench },
    { label: 'Message', path: 'message', icon: Bell },
  ];
}
