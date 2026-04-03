import { Component } from '@angular/core';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Download, Link, Copy } from 'lucide-angular';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { FileCellComponent } from '../../../../Components/file-cell/file-cell.component';

@Component({
  selector: 'app-kmc',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './kmc.html',
  styleUrl: './kmc.css',
})
export class Kmc {
  url = Apiendpoints.MASTER_KMC;

  columnDefs: ColDef[] = [];

  readonly DownloadIcon = Download;
  readonly LinkIcon = Link;
  readonly CopyIcon = Copy;

  ngOnInit(): void {
    this.setColumn();
  }

  setColumn() {
    this.columnDefs = [
      { headerName: 'Document', field: 'Kmc' },
      { headerName: 'Module', field: 'module.name' },

  // ✅ SINGLE CLEAN COLUMN FOR ALL ACTIONS
      {
        headerName: 'File Actions',
        field: 'fileupload',
        cellRenderer: FileCellComponent,
        minWidth: 160
      },

      // ✅ ACTIONS (your existing)
      {
        headerName: 'Actions',
        field: 'actions',
        width: 100,
        cellRenderer: AgActionCellComponent,
        cellRendererParams: {
          actionDisplayMode: 'float',
          actions: [
            { key: 'view', label: 'View' },
            { key: 'edit', label: 'Edit' },
            { key: 'delete', label: 'Delete' },
          ],
          onAction: (key: string, row: any) => {
            console.log('Action:', key, row);
          },
        },
      },
    ];
  }

  onAddClick() {
    console.log('Add clicked');
  }

  onEdit(data: any) {
    console.log('Edit:', data);
  }

  onDelete(data: any) {
    if (confirm('Are you sure to delete?')) {
      console.log('Delete API call here', data);
    }
  }
}
