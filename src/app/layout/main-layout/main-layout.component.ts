import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, // ✅ REQUIRED for ngClass, ngIf, ngFor
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  sidebarCollapsed = false;
  isMobile = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
