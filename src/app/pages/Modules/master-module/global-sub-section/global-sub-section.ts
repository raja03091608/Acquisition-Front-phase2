import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';

@Component({
  selector: 'app-global-sub-section',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './global-sub-section.html',
})
export class GlobalSubSection implements OnInit {

  url = Apiendpoints.MASTER_GLOBAL_SUB_SECTION;

  columnDefs: ColDef[] = [];

  queryParams = {
    page: 1
  };

  totalPagesCount = 0;

  ngOnInit() {
    this.setColumns();
  }

  setColumns() {
    this.columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Code', field: 'code' },
      { headerName: 'Name', field: 'name' },

      {
        headerName: 'Global Section',
        valueGetter: (p: any) => p.data?.global_section?.name || '-'
      },

      { headerName: 'Status', field: 'status' },

       {
      headerName: 'Actions',
      field: 'actions',
     cellRenderer: AgActionCellComponent,
      cellRendererParams: {
        actionDisplayMode: 'float',

        actions: [
          { key: 'view', label: 'View' },
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete' }
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
        }
      }
    }
    ];
  }

  // 🔥 PAGINATION
  onPageChange(event: any) {
    this.queryParams.page = event.page;
  }

  onAddClick() {
    console.log('Add');
  }
}
