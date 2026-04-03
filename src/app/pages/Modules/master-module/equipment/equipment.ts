import { Component } from '@angular/core';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment',
  imports: [PaginateTableComponent, CommonModule],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css',
})
export class Equipment {
  url = Apiendpoints.MASTER_EQUIPMENT;

  columnDefs: ColDef[] = [];

  ngOnInit(): void {
    this.setColumn();
  }

  setColumn() {
    this.columnDefs = [
      { headerName: 'Section Name', field: 'global_section.name' },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Code', field: 'code' },
      { headerName: 'Procurement Route', field: 'procurement_router' },

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
