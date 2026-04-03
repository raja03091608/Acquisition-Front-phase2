import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';


@Component({
  selector: 'app-compartments-master',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './compartments-master.html',
})
export class CompartmentsMaster implements OnInit {

  // ✅ DIRECT API
  url = Apiendpoints.MASTER_COMPARTMENT;

  columnDefs: ColDef[] = [];

  ngOnInit() {
    this.setColumns();
  }

  setColumns() {
    this.columnDefs = [
      { headerName: 'ID', field: 'id', width: 80 },
      // { headerName: 'Code', field: 'code' },
      { headerName: 'Name', field: 'name' },
      // { headerName: 'Deck No', field: 'deck_no' },
      // { headerName: 'Position', field: 'position' },
      // { headerName: 'From Frame', field: 'from_frame_station' },
      // { headerName: 'To Frame', field: 'to_frame_station' },

      // ✅ Nested fix
      {
        headerName: 'Section',
        valueGetter: (params: any) => params.data?.global_section?.name || '-'
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

  onAddClick() {
    console.log('Add compartment');
  }

  onEdit(data: any) {
    console.log('Edit:', data);
  }

  onDelete(data: any) {
    if (confirm('Are you sure to delete?')) {
      console.log('Delete API call', data);
    }
  }
}
