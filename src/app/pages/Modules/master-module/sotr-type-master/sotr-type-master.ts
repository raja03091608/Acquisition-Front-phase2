import { Component, ViewChild } from '@angular/core';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { AddFormComponent } from '../../../../Components/ui/add-form/add-form.component';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { FormCardDialogComponent } from '../../../../Components/form-card-dialog/form-card-dialog.component';
import { LucideAngularModule } from 'lucide-angular';
import { ReusableDeleteDialogComponent } from '../../../../Components/reusable-delete-dialog/reusable-delete-dialog.component';

@Component({
  selector: 'app-sotr-type-master',
  standalone: true,
    imports: [
      CommonModule,
      PaginateTableComponent,
      AddFormComponent,
      FormCardDialogComponent,
      LucideAngularModule,
      ReusableDeleteDialogComponent,
    ],
  templateUrl: './sotr-type-master.html',
  styleUrl: './sotr-type-master.css',
})
export class SotrTypeMaster {
  url = Apiendpoints.MASTER_SOTR_TYPE;

  columnDefs: ColDef[] = [];



  reloadFlag = false;

  createUrl = this.url+"/";

  @ViewChild('formComp') formComp!: AddFormComponent;

  isFormOpen = false;

  isEditMode = false;

  formData: any = {};

  currentApiUrl = this.createUrl+"/";

  // 🔥 DELETE STATES
  isDeleteOpen = false;
  deleteId: number | null = null;
  deleteName: string = '';
  isDeleting = false;

  formConfig = [
    {
      key: 'type',
      label: 'SOTR Type',
      type: 'text',
      required: true,
    },
  ];

  // {id: null, status: 1, type: "testing", created_by: 16}

  extraPayload = {
    id: null,
    status: 1,
    created_by: 16,
  };

  constructor(
    private apiService: ApiService,
    private toast: ToastService,

  ) {}


  ngOnInit(): void {
    this.setColumns();
  }

  setColumns() {
    this.columnDefs = [
      { headerName: 'ID', field: 'id', width: 90 },
      { headerName: 'Name', field: 'type' },


      {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: AgActionCellComponent,
        cellRendererParams: {
          actionDisplayMode: 'float',

          actions: [
            { key: 'view', label: 'View' },
            { key: 'edit', label: 'Edit' },
            // { key: 'delete', label: 'Delete' },
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
                id: row.id || '',
                created_by: row.created_by || '',

                status: row.status ?? 1,
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
      .post(`${Apiendpoints.MASTER_CLASS_CREATE}`, {
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
}
