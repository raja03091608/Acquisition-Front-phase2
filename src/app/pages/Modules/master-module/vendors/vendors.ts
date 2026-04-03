import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './vendors.html',
  styleUrl: './vendors.css',
})
export class Vendors {
  url = Apiendpoints.MASTER_VENDOR;

  columnDefs: ColDef[] = [];

  constructor(private location: Location) {}
  ngOnInit(): void {
    this.setColumn();
  }

  setColumn() {
    this.columnDefs = [
      { headerName: 'Vendor Code', field: 'vendor_code' },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Class Type', field: 'class_type' },

      { headerName: 'Priority', field: 'manufacturer_priority' },
      { headerName: 'Address', field: 'addressee' },
      { headerName: 'City', field: 'city' },

      { headerName: 'State', field: 'state' },
      { headerName: 'Country', field: 'country_code' },
      { headerName: 'Station', field: 'station_code' },
      {
        headerName: 'Status',
        valueGetter: (params) =>
          params.data?.status == '1' ? 'ACTIVE' : 'INACTIVE',
      },

      {
        headerName: 'Actions',
        field: 'actions',
        width: 100,
        pinned: 'right',
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

  goBack() {
  this.location.back();
}
}
