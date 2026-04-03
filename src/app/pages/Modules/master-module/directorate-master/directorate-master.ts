import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MasterService } from '../../../../services/master.service';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { AddFormComponent } from '../../../../Components/ui/add-form/add-form.component';
import { ToastService } from '../../../../services/toast.service';
import { ApiService } from '../../../../services/api.service';
import { FormCardDialogComponent } from '../../../../Components/form-card-dialog/form-card-dialog.component';
import { LucideAngularModule } from 'lucide-angular';
import { ReusableDeleteDialogComponent } from '../../../../Components/reusable-delete-dialog/reusable-delete-dialog.component';

@Component({
  selector: 'app-directorate-master',

  standalone: true,
  imports: [
    CommonModule,
    PaginateTableComponent,
    AddFormComponent,
    FormCardDialogComponent,
    LucideAngularModule,
    ReusableDeleteDialogComponent,
  ],
  templateUrl: './directorate-master.html',
  styleUrl: './directorate-master.css',
})
export class DirectorateMaster {
  reloadFlag = false;
  url = Apiendpoints.MASTER_UNIT;
  createUrl = Apiendpoints.MASTER_DIRECTORATE_CREATE;
  columnDefs: ColDef[] = [];

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

  formConfig = [
    {
      key: 'name',
      label: 'Directorate name',
      type: 'text',
      required: true,
    },
    {
      key: 'code',
      label: 'Directorate Code',
      type: 'text',
      required: true,
    },
  ];

  extraPayload = {
    id: '',
    description: '',
    status: 1,
    sequence: 3,
  };

  constructor(
    private apiService: ApiService,
    private toast: ToastService,
     private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setColumns();
  }

  setColumns() {
    this.columnDefs = [
      { headerName: 'Name', field: 'name' },
      { headerName: 'Code', field: 'code' },

      {
        headerName: 'Actions',
        field: 'actions',
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
  this.isEditMode = true;

  this.formData = row;

  this.extraPayload = {
    id: row.id,
    description: row.description || '',
    status: row.status ?? 1,
    sequence: row.sequence ?? 3,
  };

  this.currentApiUrl = `${this.createUrl}`;

  this.isFormOpen = true;
}
    if (key === 'delete') {
  this.deleteId = row.id;
  this.deleteName = row.name;
  this.isDeleteOpen = true;
}
          },
        },
      },
    ];
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
    .delete(`${Apiendpoints.MASTER_UNIT}/${this.deleteId}`)
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
  this.isDeleting = false;   // 🔥 MUST
  this.deleteId = null;
  this.deleteName = '';
}
}
