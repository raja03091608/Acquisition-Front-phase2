import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { Apiendpoints } from '../../../../ApiEndPoints';


@Component({
  selector: 'app-global-sub-sub-section',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './global-sub-sub-section.html',
})
export class GlobalSubSubSection implements OnInit {

  // ✅ API ENDPOINT
  url = Apiendpoints.MASTER_GLOBAL_SUB_SUB_SECTION

  // ✅ QUERY PARAMS (pagination)
  queryParams: any = {
    page: 1
  };

  columnDefs: ColDef[] = [];

  ngOnInit() {
    this.setColumns();
  }

  // ✅ TABLE COLUMNS
  setColumns() {
    this.columnDefs = [
      { headerName: 'ID', field: 'id', width: 80 },
      { headerName: 'Name', field: 'name' },

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

  // ✅ PAGINATION
  onPageChange(event: any) {
    this.queryParams.page = event.page;
  }

  onAddClick() {
    console.log('Add Global Sub Sub Section');
  }
}
