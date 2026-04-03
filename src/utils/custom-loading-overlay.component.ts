// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-custom-loading-overlay',
//   standalone: true,
//   template: `
//     <div class="ag-custom-loading">
//       <div class="spinner"></div>
//       <span>{{ params?.loadingMessage }}</span>
//     </div>
//   `,
//   styles: [`
//     .ag-custom-loading {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       height: 100%;
//       font-size: 14px;
//       color: #555;
//     }
//     .spinner {
//       width: 30px;
//       height: 30px;
//       border: 4px solid #ddd;
//       border-top: 4px solid #1976d2;
//       border-radius: 50%;
//       animation: spin 0.8s linear infinite;
//       margin-bottom: 10px;
//     }
//     @keyframes spin {
//       100% { transform: rotate(360deg); }
//     }
//   `]
// })
// export class CustomLoadingOverlayComponent {
//   params: any;
//   agInit(params: any): void {
//     this.params = params;
//   }
// }

// custom-loading-cell-renderer.component.ts
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-loading-cell-renderer',
  template: `
    <div class="loading-cell">
      <div class="spinner"></div>
      <span>{{ params?.loadingMessage || 'Loading...' }}</span>
    </div>
  `,
  styles: [
    `
      .loading-cell {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #555;
        font-size: 13px;
      }
      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #ccc;
        border-top: 2px solid #1976d2;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class CustomLoadingCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
}
