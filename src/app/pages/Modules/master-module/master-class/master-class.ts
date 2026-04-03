import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { AddFormComponent } from '../../../../Components/ui/add-form/add-form.component';
import { ToastService } from '../../../../services/toast.service';
import { ApiService } from '../../../../services/api.service';
import { FormCardDialogComponent } from '../../../../Components/form-card-dialog/form-card-dialog.component';
import { LucideAngularModule } from 'lucide-angular';
import { ReusableDeleteDialogComponent } from '../../../../Components/reusable-delete-dialog/reusable-delete-dialog.component';

@Component({
  selector: 'app-master-class',
  standalone: true,
  imports: [
    CommonModule,
    PaginateTableComponent,
    AddFormComponent,
    FormCardDialogComponent,
    LucideAngularModule,
    ReusableDeleteDialogComponent,
  ],
  templateUrl: './master-class.html',
  styleUrls: ['./master-class.css'],
})
export class MasterClass implements OnInit {
  url = Apiendpoints.MASTER_CLASS;

  columnDefs: ColDef[] = [];

  reloadFlag = false;

  createUrl = Apiendpoints.MASTER_CLASS_CREATE;

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
      label: 'Class Name',
      type: 'text',
      required: true,
    },
  ];

  extraPayload = {
    id: '',
    code: '',
    status: 1,
    description: '',
    sequence: 3,
  };

  constructor(
    private apiService: ApiService,
    private toast: ToastService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.setColumns();
  }

  setColumns() {
    this.columnDefs = [
      { headerName: 'ID', field: 'id', width: 10 },
      { headerName: 'Name', field: 'name' },
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
                code: row.code || '',
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
