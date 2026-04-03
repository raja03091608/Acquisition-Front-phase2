import { Component } from '@angular/core';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';

@Component({
  selector: 'app-ilms-spars',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './ilms-spars.html',
  styleUrl: './ilms-spars.css',
})
export class IlmsSpars {
  url = Apiendpoints.MASTER_ILMS_SPARE;

   queryParams: any = {
    page: 1
  };

  columnDefs: ColDef[] = [];

  ngOnInit(): void {
    this.setColumn();
  }
  setColumn() {
    this.columnDefs = [
      {
        headerName: 'Vendor Name',
        valueGetter: (p) => p.data?.obs_spare?.vendor_name || '-',
      },

      {
        headerName: 'Equipment Name',
        valueGetter: (p) => p.data?.obs_spare?.equipment_name || '-',
      },

      {
        headerName: 'ILMS Type',
        valueGetter: (p) => p.data?.obs_spare?.ilms_type || '-',
      },

      {
        headerName: 'ILMS Code',
        valueGetter: (p) => p.data?.obs_spare?.oem_item_code || '-',
      },

      {
        headerName: 'BND Spare',
        valueGetter: (p) => p.data?.bnd_spare?.name || '-',
      },

      {
        headerName: 'OBS Spare',
        valueGetter: (p) => p.data?.obs_spare?.name || '-',
      },

      {
        headerName: 'MRLS Type',
        valueGetter: (p) => p.data?.obs_spare?.mrls_type || '-',
      },

      {
        headerName: 'Project Code',
        valueGetter: (p) => p.data?.obs_spare?.project_code || '-',
      },

      {
        headerName: 'Customer Code',
        valueGetter: (p) => p.data?.obs_spare?.customer_code || '-',
      },

      {
        headerName: 'Source DTE',
        valueGetter: (p) => p.data?.obs_spare?.source_dte || '-',
      },

      {
        headerName: 'CRP Category',
        valueGetter: (p) => p.data?.obs_spare?.crp_category || '-',
      },

      {
        headerName: 'VED Category',
        valueGetter: (p) => p.data?.obs_spare?.ved_category || '-',
      },

      {
        headerName: 'ABC Category',
        valueGetter: (p) => p.data?.obs_spare?.abc_category || '-',
      },

      {
        headerName: 'Section Head',
        valueGetter: (p) => p.data?.obs_spare?.section_head || '-',
      },

      {
        headerName: 'Review Subsection Code',
        valueGetter: (p) => p.data?.obs_spare?.review_subsection_code || '-',
      },

      {
        headerName: 'Station Code',
        valueGetter: (p) => p.data?.obs_spare?.station_code || '-',
      },

      // ✅ ACTIONS
      {
        headerName: 'Actions',
        field: 'actions',
        width: 80,
        pinned:'right',
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

  onPageChange(event: any) {
    console.log('Page Change:', event);

    this.queryParams = {
      page: event.page
    };
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
