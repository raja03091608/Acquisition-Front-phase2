

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../../../services/master.service';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { CommonModule, Location } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { AddFormComponent } from '../../../../Components/ui/add-form/add-form.component';
import { ToastService } from '../../../../services/toast.service';
import { ApiService } from '../../../../services/api.service';
import { FormCardDialogComponent } from '../../../../Components/form-card-dialog/form-card-dialog.component';
import { LucideAngularModule } from 'lucide-angular';
import { ReusableDeleteDialogComponent } from '../../../../Components/reusable-delete-dialog/reusable-delete-dialog.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-global-sub-sub-section',
  standalone: true,
  imports: [
    CommonModule,
    PaginateTableComponent,
    AddFormComponent,
    FormCardDialogComponent,
    LucideAngularModule,
    ReusableDeleteDialogComponent,
  ],
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

 formConfig: any[] = [];
  reloadFlag = false;
  createUrl = Apiendpoints.MASTER_GLOBAL_SUB_SECTION + '/details';

  @ViewChild('formComp') formComp!: AddFormComponent;

  isFormOpen = false;

  isEditMode = false;

  formData: any = {};

  currentApiUrl = this.createUrl;

  // 🔥 DELETE STATES
  isDeleteOpen = false;
  deleteId: number | null = null;
  deleteName: string = '';
  isDeleting = false;

  ngOnInit() {
    this.setColumns();

    this.formConfig = [

  {
    key: 'global_section',
    label: 'Global Section',
    type: 'select',
    required: true,
    apiUrl: 'master/global_section?status=1',
  },

  {
    key: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },

  {
    key: 'sequence',
    label: 'Order',
    type: 'text',
    required: true,
  },

  // 🔥 STATIC OBJECT DROPDOWN
  {
    key: 'data_typ',
    label: 'Data Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Editor', value: 1 },
      { label: 'Datepicker', value: 2 },
      { label: 'Number', value: 3 },
      { label: 'Dropdown', value: 4 },
      { label: 'Upload File', value: 5 }
    ]
  },

  // 🔥 DYNAMIC FIELD
  {
    key: 'default_values',
    label: 'Default Value',
    type: 'text',
    required: true,

  }

];
  }


  constructor(
    private apiService: ApiService,
    private toast: ToastService,
    private cd: ChangeDetectorRef,
    private location: Location,
  ) {}

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

    extraPayload: any = {
    id: '',
    created_by: '16',
    status: 1,
  };

  // ✅ PAGINATION
  onPageChange(event: any) {
    this.queryParams.page = event.page;
  }

  onAddClick() {
    this.isEditMode = false;
    this.formData = {};
    this.currentApiUrl = this.createUrl;

    this.isFormOpen = true;
  }

  onEdit(data: any) {
    console.log('Edit:', data);
  }

  handleSuccess() {
    this.isFormOpen = false;

    // 🔥 table refresh trigger
    this.reloadFlag = !this.reloadFlag;
  }

  handleDeleteConfirm() {
    if (!this.deleteId) return;

    this.apiService
      .post(`${Apiendpoints.MASTER_GLOBAL_SUB_SECTION + '/details'}`, {
        id: this.deleteId,
        status: 3,
      })
      .subscribe({
        next: () => {
          // ✅ STEP 1: reset data FIRST
          this.deleteId = null;
          this.deleteName = '';

          // ✅ STEP 2: refresh table FIRST
          this.reloadFlag = !this.reloadFlag;

          // ✅ STEP 3: CLOSE MODAL AFTER UI UPDATE
          setTimeout(() => {
            this.isDeleteOpen = false;
          }, 0);

          this.toast.showSuccess('Deleted successfully');
        },

        error: () => {
          this.toast.showError('Delete failed');
        },
      });
  }
  onDeleteCancel() {
    this.isDeleteOpen = false;
    this.isDeleting = false; // 🔥 MUST
    this.deleteId = null;
    this.deleteName = '';
  }

  goBack() {
    this.location.back();
  }

  onDataLoaded(data: any[]) {
    console.log('Table Data:', data);
  }

onFieldChange(event: any) {

  if (event.key === 'data_typ') {

    const type = event.value;

    const field = this.formConfig.find(f => f.key === 'default_values');

    if (!field) return;

    // 🔥 RESET FIRST
    field.apiUrl = null;
    field.options = null;

    // 🔥 SWITCH CASE
    if (type == 1) {
      field.type = 'textarea'; // Editor
    }

    else if (type == 2) {
      field.type = 'date'; // Datepicker
    }

    else if (type == 3) {
      field.type = 'number';
    }

    else if (type == 4) {
      field.type = 'select';
      field.apiUrl = 'master/options'; // 🔥 your dropdown API
    }

    else if (type == 5) {
      field.type = 'text'; // file name or input
    }

    // 🔥 FORCE UI UPDATE
    this.formConfig = [...this.formConfig];
  }
}
}
