import { Component } from '@angular/core';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ship-master',
  standalone:true,
  imports: [PaginateTableComponent,CommonModule],
  templateUrl: './ship-master.html',
  styleUrl: './ship-master.css',
})
export class ShipMaster {


  url = Apiendpoints.MASTER_SHIP;

    columnDefs: ColDef[] = [];

    ngOnInit(): void {
      this.setColumn();
    }

    setColumn() {
      this.columnDefs = [

        { headerName: 'Ship', field: 'sss_master.name' },


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
