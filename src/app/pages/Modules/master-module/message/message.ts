import { Component, ViewChild } from '@angular/core';
import { Apiendpoints } from '../../../../ApiEndPoints';
import { ColDef } from 'ag-grid-community';
import { AgActionCellComponent } from '../../../../../utils/action-column.factory';
import { CommonModule } from '@angular/common';
import { PaginateTableComponent } from '../../../../Components/paginate-table/paginate-table.component';
import { AddFormComponent } from '../../../../Components/ui/add-form/add-form.component';
import { FormCardDialogComponent } from '../../../../Components/form-card-dialog/form-card-dialog.component';
import { LucideAngularModule, Plus, Pencil, X } from 'lucide-angular';
import { ReusableDeleteDialogComponent } from '../../../../Components/reusable-delete-dialog/reusable-delete-dialog.component';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    CommonModule,
    PaginateTableComponent,
    AddFormComponent,
    FormCardDialogComponent,
    LucideAngularModule,
    ReusableDeleteDialogComponent ,
  ],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message {
  reloadFlag = false;

  url = Apiendpoints.MASTER_MESSAGES;

  createUrl = Apiendpoints.MASTER_MASSAGE_CREATE;
  deleteUrl = Apiendpoints.MASTER_MASSAGE_CREATE;

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
      key: 'status_code',
      label: 'Message Code',
      type: 'text',
      required: true,
    },
    {
      key: 'msg',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
  ];

  constructor(
  private apiService: ApiService,
  private toast: ToastService
) {}

  ngOnInit(): void {
    this.setColumn();
  }

  setColumn() {
    this.columnDefs = [
      { headerName: 'Message Code', field: 'status_code' },
      { headerName: 'Massage', field: 'msg' },

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
              this.isEditMode = true;

              this.formData = row; // 🔥 data set
              this.currentApiUrl = `${this.createUrl}/${row.id}`; // 🔥 update API

              this.isFormOpen = true; // 🔥 open dialog
            }
            if (key === 'delete') {
              this.deleteId = row.id;
              this.deleteName = row.msg; // ya row.name

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

  onDelete(data: any) {
    if (confirm('Are you sure to delete?')) {
      console.log('Delete API call here', data);
    }
  }

  handleSuccess() {
    this.isFormOpen = false;

    // 🔥 table refresh trigger
    this.reloadFlag = !this.reloadFlag;
  }



handleDeleteConfirm() {
  if (!this.deleteId || this.isDeleting) return;

  this.isDeleting = true;

  this.apiService.delete(`${Apiendpoints.MASTER_MASSAGE_CREATE}/${this.deleteId}`)
    .subscribe({
      next: () => {

        // ✅ RESET FIRST
        this.isDeleting = false;
        this.isDeleteOpen = false;

        this.deleteId = null;
        this.deleteName = '';

        // ✅ refresh
        this.reloadFlag = !this.reloadFlag;

        this.toast.showSuccess('Deleted successfully');
      },

      error: () => {
        this.isDeleting = false;
        this.toast.showError('Delete failed');
      }
    });
}

onDeleteCancel() {
  this.isDeleteOpen = false;
  this.isDeleting = false;   // 🔥 VERY IMPORTANT
  this.deleteId = null;
  this.deleteName = '';
}
}
