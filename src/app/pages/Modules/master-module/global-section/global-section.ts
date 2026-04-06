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
  selector: 'app-global-section',
  standalone: true,
  imports: [  CommonModule,
      PaginateTableComponent,
      AddFormComponent,
      FormCardDialogComponent,
      LucideAngularModule,
      ReusableDeleteDialogComponent,],
  templateUrl: './global-section.html',
})
export class GlobalSection implements OnInit {
  // ✅ DIRECT API (LIKE UNITS)
  url = Apiendpoints.MASTER_GLOBAL_SECTION;

  reloadFlag = false;
  createUrl =Apiendpoints.MASTER_GLOBAL_SECTION+"/details"

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


  constructor(
    private apiService: ApiService,
    private toast: ToastService,
     private cd: ChangeDetectorRef,
     private location:Location
  ) {}


formConfig: any[] = [];

ngOnInit() {
  this.setColumns();

  this.formConfig = [

    {
  key: 'sub_module',
  label: 'Sub Module',
  type: 'select',
  required: true,
   apiUrl: 'master/sub_module'
},

     {
      key: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      key: 'sequence',
      label: 'order',
      type: 'text',
      required: true,
    }
  ];
}

  extraPayload:any = {
    id: '',
    created_by: '16',
  status: 1,
  };



  rowData: any[] = [];
  columnDefs: ColDef[] = [];

  page = 1;
  pageSize = 10;
  totalPagesCount = 0;




  setColumns() {
    this.columnDefs = [
      { field: 'id', headerName: 'ID', width: 80 },

      { field: 'name', headerName: 'Section Name' },

      {
        headerName: 'Sub Module',
        valueGetter: (p: any) => p.data?.sub_module?.name || '-',
      },


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

            if (key === 'edit') {
              this.isEditMode = true;
              this.formData = row;

              this.extraPayload = {
                id: row.id,
                description: row.description || '',
                status: row.status ?? 1,
                sequence: row.sequence ?? 3,
              };

              this.currentApiUrl = this.createUrl;
              this.isFormOpen = true;
            }

            if (key === 'delete') {
              this.deleteId = row.id;
              this.deleteName = row.name;
              this.isDeleteOpen = true;
            }
          }
        }
      }
    ];
  }

  // ✅ Pagination
  onPageChange(event: any) {
    this.page = event.page;
    this.pageSize = event.pageSize;

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
    .post(`${Apiendpoints.MASTER_GLOBAL_SECTION+"/details"}`,{id:this.deleteId,status:3})
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

 goBack() {
  this.location.back();
}

onDataLoaded(data: any[]) {
  console.log('Table Data:', data);
}
}
