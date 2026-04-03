import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';

@Component({
  selector: 'app-global-section',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './global-section.html',
})
export class GlobalSection implements OnInit {
  // ✅ DIRECT API (LIKE UNITS)
  url = Apiendpoints.MASTER_GLOBAL_SECTION;

  columnDefs: ColDef[] = [];

  ngOnInit() {
    this.setColumns();
  }

  setColumns() {
    this.columnDefs = [
      { field: 'id', headerName: 'ID', width: 80 },

      { field: 'name', headerName: 'Section Name' },

      {
        headerName: 'Sub Module',
        valueGetter: (p: any) => p.data?.sub_module?.name || '-',
      },

      // 🔥 ACTION COLUMN
      {
        headerName: 'Actions',
        field: 'actions',
        pinned:"right",
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

            if (key === 'view') {
              alert('View: ' + row.name);
            }
            if (key === 'edit') {
              alert('Edit: ' + row.name);
            }
            if (key === 'delete') {
              if (confirm('Are you sure to delete?')) {
                console.log('Delete API call here');
              }
            }
          },
        },
      },
    ];
  }

  onAddClick() {
    console.log('Add Global Section');
  }

  onTableAction(action: string, row: any) {
    console.log(action, row);
  }

  onImport() {
    console.log('Import');
  }

  onExport() {
    console.log('Export');
  }
}
