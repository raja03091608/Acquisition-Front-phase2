// import { CommonModule } from '@angular/common';
// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { Router, NavigationEnd, RouterModule } from '@angular/router';
// import {
//   Anchor,
//   Database,
//   LayoutDashboard,
//   LogOutIcon,
//   LucideAngularModule,
//   LucideIconData,
//   Ship,
//   ShipIcon,
//   Ticket,
//   Users,
// } from 'lucide-angular';
// import { ClipboardList } from 'lucide-angular/src/icons';
// import { filter } from 'rxjs/operators';
// import { StorageService } from '../../services/storage.service';

// interface SidebarItem {
//   title: string;
//   path?: string;
//   icon: LucideIconData;
//   items?: SidebarItem[];
// }

// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [CommonModule, RouterModule, LucideAngularModule],
//   templateUrl: './sidebar.component.html',
// })
// export class SidebarComponent implements OnInit {
//   @Input() collapsed = false;
//   @Input() isMobile = false;
//   @Output() close = new EventEmitter<void>();

//   readonly ShipIcon = ShipIcon;
//   readonly HituIcon = Anchor;
//   readonly LogoutIcon = LogOutIcon;

//   expandedItems: string[] = [];
//   currentPath = '';

//   sidebarItems: SidebarItem[] = [
//     { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
//     { title: 'Setup', icon: Users, path: '/setup' },
//     { title: 'Global Masters', icon: Database, path: '/masters' },
//     { title: 'WRSTG', icon: Ship, path: '/wrstg' },
//     { title: 'SEG', icon: ClipboardList, path: '/seg' },
//   ];

//   constructor(
//     private router: Router,
//     private storageService: StorageService,
//   ) {}

//   // ngOnInit(): void {
//   //   this.currentPath = this.router.url;
//   //   this.router.events
//   //     .pipe(filter((event) => event instanceof NavigationEnd))
//   //     .subscribe((event: any) => {
//   //       this.currentPath = event.urlAfterRedirects;

//   //       if (this.isMobile) {
//   //         this.close.emit();
//   //       }
//   //     });

//   //   const permissions = this.storageService.getItem('permissions');
//   //   const sideBarPermission = permissions.filter((item: { privileges: [] }) =>
//   //     item.privileges.some(
//   //       (rights: { name: string; status: boolean }) =>
//   //         rights.name === 'View' && rights.status === true,
//   //     ),
//   //   );
//   //   // ------------------------- NEED TO UNCOMMENT FOR SHOWING SIDE BARS AS PER PERMISSIONS ------------------
//   //   // const permissionNames = sideBarPermission.map((p: any) => p.name);

//   //   // // filter sidebar items
//   //   // this.sidebarItems = this.sidebarItems.filter((item) =>
//   //   //   permissionNames.includes(item.title),
//   //   // );
//   // }

//   ngOnInit(): void {
//   this.currentPath = this.router.url;

//   this.router.events
//     .pipe(filter((event) => event instanceof NavigationEnd))
//     .subscribe((event: any) => {
//       this.currentPath = event.urlAfterRedirects;

//       if (this.isMobile) {
//         this.close.emit();
//       }
//     });

//   // SAFE PERMISSIONS
//   let permissions = this.storageService.getItem('permissions');

//   if (!permissions || !Array.isArray(permissions)) {
//     permissions = [];
//   }

//   const sideBarPermission = permissions.filter((item: any) =>
//     item?.privileges?.some(
//       (rights: any) => rights.name === 'View' && rights.status === true
//     )
//   );

//   console.log('Sidebar Permissions:', sideBarPermission);
// }

//   toggleExpanded(title: string) {
//     if (this.expandedItems.includes(title)) {
//       this.expandedItems = this.expandedItems.filter((t) => t !== title);
//     } else {
//       this.expandedItems.push(title);
//     }
//   }

//   isActive(path?: string): boolean {
//     if (!path) return false;

//     if (path === '/app/dashboard') {
//       return this.currentPath === '/app/dashboard';
//     }

//     return this.currentPath.startsWith(path);
//   }

//   hasActiveChild(item: SidebarItem): boolean {
//     if (item.path) {
//       return this.isActive(item.path);
//     }
//     if (item.items) {
//       return item.items.some((child) => this.hasActiveChild(child));
//     }
//     return false;
//   }

//   logout() {
//     this.router.navigate(['/login']);
//   }
// }



import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

import {
  LucideAngularModule,
  Layers,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Users,
  Database,
  Ship,
  ClipboardList,
  LucideIconData
} from 'lucide-angular';

import { StorageService } from '../../services/storage.service';

interface SidebarItem {
  title: string;
  path?: string;
  icon?: LucideIconData;
  items?: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  @Input() collapsed = false;
  @Input() isMobile = false;
  @Output() close = new EventEmitter<void>();

  readonly LayersIcon = Layers;
  readonly XIcon = X;
  readonly ChevronDownIcon = ChevronDown;
  readonly LogoutIcon = LogOut;

  expandedItems: string[] = [];
  currentPath = '';

  sidebarItems: SidebarItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'Global Masters', icon: Database, path: '/masters' },

  ];

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath = event.urlAfterRedirects;

        if (this.isMobile) {
          this.close.emit();
        }
      });

    this.loadPermissions();
  }

  loadPermissions() {
    let permissions = this.storageService.getItem('permissions');

    if (!permissions || !Array.isArray(permissions)) {
      permissions = [];
    }

    const sideBarPermission = permissions.filter((item: any) =>
      item?.privileges?.some(
        (rights: any) => rights.name === 'View' && rights.status === true
      )
    );

    console.log('Sidebar Permissions:', sideBarPermission);
  }

  toggleExpanded(title: string) {
    if (this.expandedItems.includes(title)) {
      this.expandedItems = this.expandedItems.filter((t) => t !== title);
    } else {
      this.expandedItems.push(title);
    }
  }

  isActive(path?: string): boolean {
    if (!path) return false;
    return this.currentPath.startsWith(path);
  }

  hasActiveChild(item: SidebarItem): boolean {
    if (item.path) {
      return this.isActive(item.path);
    }
    if (item.items) {
      return item.items.some((child) => this.hasActiveChild(child));
    }
    return false;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

