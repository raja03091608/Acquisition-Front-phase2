
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';


import {
  LucideAngularModule,
  Menu,
  Bell,
  Settings,
  Search,
  Users,
  Power,
  Phone,
  ChevronDown,
  User,
  Shield,
  LogOut
} from 'lucide-angular';
import { environment } from '../../../environments/environment';

import { HostListener } from '@angular/core';

interface User {
  username?: string;
  name?: string;
  user_roles?: { role: string }[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
    styleUrl: './header.component.css',

})
export class HeaderComponent implements OnInit {



  notifOpen = false;
helpOpen = false;

notifications = [
  {
    title: 'New Update',
    body: 'Equipment module updated',
    time: '2 min ago',
    color: '#22c55e'
  },
  {
    title: 'Alert',
    body: 'Pending approval required',
    time: '10 min ago',
    color: '#f59e0b'
  }
];


  userManualUrl: string=""

  @Input() isMobile = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  // Icons
  readonly MenuIcon = Menu;
  readonly BellIcon = Bell;
  readonly SettingsIcon = Settings;
  readonly SearchIcon = Search;
  readonly UsersIcon = Users;
  readonly PowerIcon = Power;
  readonly PhoneIcon = Phone;
  readonly ChevronDownIcon = ChevronDown;
  readonly UserIcon = User;
  readonly ShieldIcon = Shield;
  readonly LogOutIcon = LogOut;

  user: User | null = null;
  breadcrumbs: { path: string; label: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try { this.user = JSON.parse(userData); } catch { this.user = null; }
    }

    this.buildBreadcrumbs(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.buildBreadcrumbs(e.urlAfterRedirects));

       this.userManualUrl = `${environment.apiUrl}media/PSR.pdf`
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  // logout() {
  //   localStorage.removeItem('user');
  //   this.router.navigate(['/login']);
  // }

  logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('unit_id');
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  this.router.navigate(['/login']);
}

  buildBreadcrumbs(url: string) {
    const segments = url.split('/').filter(Boolean);
    this.breadcrumbs = segments.map((seg, i) => ({
      path: '/' + segments.slice(0, i + 1).join('/'),
      label: seg.charAt(0).toUpperCase() + seg.slice(1),
    }));
  }

  get displayName() {
    return this.user?.name || 'User';
  }

  get avatarLetter() {
    return this.displayName.charAt(0).toUpperCase();
  }

  @HostListener('document:click', ['$event'])
handleClickOutside(event: any) {
  const clickedInside = event.target.closest('.dropdown-wrapper');

  if (!clickedInside) {
    this.notifOpen = false;
    this.helpOpen = false;
  }
}

}
