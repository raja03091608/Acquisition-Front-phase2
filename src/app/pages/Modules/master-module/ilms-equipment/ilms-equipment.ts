import { Component } from '@angular/core';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';

@Component({
  selector: 'app-ilms-equipment',
  standalone: true,
  imports: [CommonModule, PaginateTableComponent],
  templateUrl: './ilms-equipment.html',
  styleUrl: './ilms-equipment.css',
})
export class IlmsEquipment {

  url = Apiendpoints.MASTER_ILMS_EQUIPMENT;

  columnDefs: ColDef[] = [];

  // ✅ pagination params
  queryParams: any = {
    page: 1
  };

  ngOnInit(): void {
    this.setColumn();
  }

  setColumn() {
    this.columnDefs = [

      // ✅ Vendor Name
      {
        headerName: 'Vendor Name',
        valueGetter: p => p.data?.vendor?.name || '-'
      },

      // ✅ Equipment Name
      {
        headerName: 'Equipment Name',
        valueGetter: p => p.data?.equipment?.name || '-'
      },

      // ✅ ILMS Type
      {
        headerName: 'ILMS Type',
        valueGetter: p => p.data?.eqpt_type || '-'
      },

      // ✅ ILMS Code
      {
        headerName: 'ILMS Code',
        valueGetter: p => p.data?.ilms_code || '-'
      },

      // ✅ BND Spare
      {
        headerName: 'BND Spare',
        valueGetter: p => p.data?.equipment?.bnd_applicable ? 'YES' : 'NO'
      },

      // ✅ MRLS Type
      {
        headerName: 'MRLS Type',
        valueGetter: p => p.data?.equipment?.sotr_type || '-'
      },

      // ✅ Project Code
      {
        headerName: 'Project Code',
        valueGetter: p => p.data?.eqpt_code || '-'
      },

      // ✅ Customer Code
      {
        headerName: 'Customer Code',
        valueGetter: p => p.data?.vendor_code || '-'
      },

      // ✅ Source DTE
      {
        headerName: 'Source DTE',
        valueGetter: p => p.data?.created_on?.split('T')[0] || '-'
      },

      // ✅ CRP
      {
        headerName: 'CRP Category',
        valueGetter: p => p.data?.crp_category || '-'
      },

      // ✅ VED
      {
        headerName: 'VED Category',
        valueGetter: p => p.data?.ved_category || '-'
      },

      // ✅ ABC
      {
        headerName: 'ABC Category',
        valueGetter: p => p.data?.abc_category || '-'
      },

      // ✅ Section Head
      {
        headerName: 'Section Head',
        valueGetter: p => p.data?.equipment?.global_section || '-'
      },

      // ✅ Review Subsection
      {
        headerName: 'Review Subsection Code',
        valueGetter: p => p.data?.equipment?.global_sub_section || '-'
      },

      // ✅ Station Code
      {
        headerName: 'Station Code',
        valueGetter: p => p.data?.vendor?.station_code || '-'
      },

      // ✅ Status
      {
        headerName: 'Status',
        valueGetter: (p) =>
          p.data?.status == 1 ? 'ACTIVE' : 'INACTIVE'
      },

      // ✅ ACTIONS
      {
        headerName: 'Actions',
        field: 'actions',
        width: 80,
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
          },
        },
      },
    ];
  }

  // ✅ pagination handler
  onPageChange(event: any) {
    this.queryParams = {
      page: event.page
    };
  }

  onAddClick() {
    console.log('Add clicked');
  }
}
