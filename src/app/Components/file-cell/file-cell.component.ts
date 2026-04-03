import { Component } from '@angular/core';
import { LucideAngularModule, Download, Link, Copy } from 'lucide-angular';

@Component({
  selector: 'app-file-cell',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="icon-wrapper">

      <!-- Download -->
      <div class="icon-btn blue" (click)="download($event)" title="Download">
        <lucide-icon [img]="downloadIcon"></lucide-icon>
      </div>

      <!-- Open Link
      <div class="icon-btn green" (click)="open($event)" title="Open Link">
        <lucide-icon [img]="linkIcon"></lucide-icon>
      </div> -->

      <!-- Copy -->
      <div class="icon-btn yellow" (click)="copy($event)" title="Copy Link">
        <lucide-icon [img]="copyIcon"></lucide-icon>
      </div>

    </div>
  `,
  styles: [`
    .icon-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-btn {
      width: 30px;
      height: 30px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.2s ease;
    }

    .icon-btn lucide-icon {
      width: 16px;
      height: 16px;
    }

    .icon-btn:hover {
      transform: scale(1.1);
    }

    .blue { background:#eff6ff; color:#2563eb; }
    .green { background:#ecfdf5; color:#16a34a; }
    .yellow { background:#fffbeb; color:#f59e0b; }
  `]
})
export class FileCellComponent {
  downloadIcon = Download;
  linkIcon = Link;
  copyIcon = Copy;

  params: any;

  agInit(params: any) {
    this.params = params;
  }

  download(event: Event) {
    event.stopPropagation();
    if (this.params.value) {
      window.open(this.params.value, '_blank');
    }
  }

  open(event: Event) {
    event.stopPropagation();
    if (this.params.value) {
      window.open(this.params.value, '_blank');
    }
  }

  copy(event: Event) {
    event.stopPropagation();
    if (this.params.value) {
      navigator.clipboard.writeText(this.params.value);
      alert('Link copied!');
    }
  }
}
