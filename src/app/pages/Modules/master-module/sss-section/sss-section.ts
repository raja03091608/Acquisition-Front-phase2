import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
  selector: 'app-sss-section',
  standalone:true,
  imports: [
    CommonModule,
    PaginateTableComponent,
    AddFormComponent,
    FormCardDialogComponent,
    LucideAngularModule,
    ReusableDeleteDialogComponent,
  ],
  templateUrl: './sss-section.html',
  styleUrl: './sss-section.css',
})
export class SssSection {


  url = Apiendpoints.MASTER_SSS_SECTION;

    columnDefs: ColDef[] = [];


  totalPagesCount = 0;

  reloadFlag = false;

  createUrl = Apiendpoints.MASTER_PROJECT_TYPE_CREATE;

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
      label: 'Project Type Name',
      type: 'text',
      required: true,
    },
    {
      key: 'description',
      label: 'Project Type Description',
      type: 'textarea',
      required: true,
    },
  ];

  extraPayload = {
    id: null,
    code: '',
    status: 1,
    sequence: null,
    created_by: 16,
    created_ip: null,
    modified_by: null,
  };

  constructor(
    private apiService: ApiService,
    private toast: ToastService,
    private cd: ChangeDetectorRef,
    private location: Location,
  ) {}

    ngOnInit(): void {
      this.setColumn();
    }

    setColumn() {
      this.columnDefs = [

        { headerName: 'SSS Section', field: 'sss_master.name' },
        { headerName: 'Mapped from Sub-Module', field: 'sub_module.name' },
        {headerName:'Mapped From Section', field:'section.name'},
        {headerName:'Mapped From Sub Section',field:'sub_section.name'},
         {headerName:'Mapped From Sub Sub Section',field:'sub_sub_section.name'},

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
      .post(`${Apiendpoints.MASTER_PROJECT_TYPE_CREATE}`, {
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
}
