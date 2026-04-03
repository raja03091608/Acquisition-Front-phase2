
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { Apiendpoints } from '../../../../ApiEndPoints';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './projects.html',
})
export class Projects implements OnInit {

  // ✅ API ENDPOINT
  url = Apiendpoints.MASTER_PROJECT

  // ✅ PARAMS
  queryParams: any = {
    page: 1,
    order_column: 'id',
    order_type: 'desc'
  };

  columnDefs: ColDef[] = [];

  ngOnInit() {
    this.setColumns();
  }

  // ✅ COLUMNS (AS YOU ASKED)
  setColumns() {
    this.columnDefs = [
      {
        headerName: 'Project Name',
        field: 'name'
      },

      {
        headerName: 'Project Type',
        valueGetter: (p: any) =>
          p.data?.project_type_det?.name || '-'
      },

      {
        headerName: 'Class Name',
        valueGetter: (p: any) =>
          p.data?.class_id?.name || '-'
      },
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

  // ✅ PAGINATION FIX
  onPageChange(event: any) {
    this.queryParams = {
      ...this.queryParams,
      page: event.page
    };
  }

  onAddClick() {
    console.log('Add Project');
  }
}
