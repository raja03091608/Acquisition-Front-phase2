import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { LucideAngularModule, Plus, Search } from 'lucide-angular';
import { ArrowLeft } from 'lucide-angular';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { PaginateTableLoadingComponent } from '../paginate-table-loading/paginate-table-loading.component';
import { AgGridAngular } from 'ag-grid-angular';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import type { ElementRef } from '@angular/core';
import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColDef,
  GridApi,
  GridOptions,
  ModuleRegistry,
  themeQuartz,
  PaginationModule,
  PaginationNumberFormatter,
  PaginationNumberFormatterParams,
  RowApiModule,
  ChartRef,
  GridReadyEvent,
  FirstDataRenderedEvent,
  RowSelectionModule,
  RowSelectionOptions,
  ValidationModule,
  colorSchemeDark,
  iconSetMaterial,
  colorSchemeLight,
} from 'ag-grid-community';

import {
  ColumnMenuModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  SetFilterModule,
  IntegratedChartsModule,
  RowGroupingModule,
} from 'ag-grid-enterprise';

import { AllEnterpriseModule } from 'ag-grid-enterprise';

import { ApiService } from '../../services/api.service';
import { AgActionCellComponent } from '../../../utils/action-column.factory';

// ✅ Modules
ModuleRegistry.registerModules([
  AllEnterpriseModule,
  PaginationModule,
  ValidationModule,
  FiltersToolPanelModule,
  ClientSideRowModelApiModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
  ColumnMenuModule,
  ContextMenuModule,
  RowGroupingModule,
  RowSelectionModule,
  RowApiModule,
  ClientSideRowModelModule,
  ColumnMenuModule,
  ContextMenuModule,
  SetFilterModule,
]);

@Component({
  selector: 'app-paginate-table',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    AgGridAngular,
    // ReusableButtonComponent,
    // AgActionCellComponent,
  ],
  templateUrl: './paginate-table.component.html',
  styleUrls: ['./paginate-table.component.css'],
})
export class PaginateTableComponent implements OnInit {
  @Input() reloadTrigger: any;
  private gridApi!: GridApi;
  @Output() dataLoaded = new EventEmitter<any[]>();

  readonly BackIcon = ArrowLeft;
  readonly PlusIcon = Plus;
  readonly SearchIcon = Search;

  @Input() showMultiSelect = false;



  /* Header */
  @Input() showHeaderSection = true;
  @Input() title?: string;
  @Input() description?: string;
  @Input() url?: string;

  @Input() showBackButton = false;
@Output() onBackClick = new EventEmitter<void>();

  /* Search */
  @Input() showSearch = false;
  @Input() searchValue = '';

  /* CSV */
  @Input() showImport = false;
  @Input() showExport = false;
  @Output() handleImport = new EventEmitter<void>();
  @Output() handleExport = new EventEmitter<void>();
  importLabel = 'Import';
  exportLabel = 'Export';

  // SELECT DROP-DOWN
  @Input() showSelectDropdown: boolean = false;
  @Input() selectOptions: { label: string; value: any }[] = [];
  @Input() selectedValue: any;

  @Output() selectChange = new EventEmitter<any>();

  onSelectChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectChange.emit(value);
  }



  @Input() tableLoading = false;

  /* Buttons */
  @Input() showAddButton = false;
  @Input() addButtonText = 'Add';
  @Input() showPagination: boolean = true;
  @Input() totalPagesCount = 0;
  @Input() page = 1;
  @Output() onAddButtonClick = new EventEmitter<void>();

  /* Grid */
  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Input() queryParams: any = {};

  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();

  defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 150,

  };


  sideBar = {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: 'row',
  };

  myTheme = themeQuartz
  .withPart(iconSetMaterial)
  .withPart(colorSchemeLight).withParams({
    backgroundColor: '#ffffff',
    foregroundColor: '#000000',
    headerBackgroundColor: '#172554',
    headerTextColor: '#ffffff',
    oddRowBackgroundColor: '#e3eaf6',
  });
  popupParent: HTMLElement | null = document.body;
  chartRef?: ChartRef;
  createdTime?: string;

  // ✅ Pagination config
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 20, 50,100,200];

  paginationNumberFormatter: PaginationNumberFormatter = (
    params: PaginationNumberFormatterParams,
  ) => {
    return '[' + params.value.toLocaleString() + ']';
  };

  // ✅ CSP nonce (optional)
  private nonce = (window as any).__CSP_NONCE__ as string | undefined;

  gridOptions!: GridOptions;

  // Avoid duplicate calls (AG Grid fires paginationChanged multiple times)
  private lastPage = -1;
  private lastPageSize = -1;

  constructor(private apiService: ApiService) {
  }
  ngOnInit(): void {
    if(this.rowData.length === 0 && this.url) {
      this.loadData();
    }



    this.gridOptions = {
      headerHeight: 50,
      floatingFiltersHeight: 46,
      rowHeight: 40,
      ...(this.nonce ? { styleNonce: this.nonce } : {}),
      rowMultiSelectWithClick: this.showMultiSelect,
      pagination: this.showPagination,
      paginationPageSize: this.paginationPageSize,
      paginationPageSizeSelector: this.paginationPageSizeSelector,
      paginationNumberFormatter: this.paginationNumberFormatter,
    };
  }
  loadData() {
   this.apiService.get(this.url || '' , this.queryParams).subscribe((res: any) => {


    const data = res?.results?.data
          || res?.results
          || res?.data
          || res
          || [];

this.rowData = data;
this.dataLoaded.emit(this.rowData);
      this.totalPagesCount = res?.count
        ? Math.ceil(res.count / 10)
        : 0;
    if(this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
      this.gridApi.refreshCells({ force: true });
    }
   });
}
  ngOnChanges(changes: SimpleChanges): void {
     if (changes['reloadTrigger'] && !changes['reloadTrigger'].firstChange) {
    this.loadData(); // 🔥 reload API
  }
    if (changes['url'] && !changes['url'].firstChange) {
      this.loadData();
    }

    if (!this.gridApi) return;

    if (changes['rowData']) {
      this.gridApi.setGridOption('rowData', this.rowData);
      this.gridApi.refreshCells({ force: true });
    }

  if (changes['queryParams'] && this.url) {
    this.loadData();
  }

  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.emitPageChangeIfNeeded();
  }

  onPaginationChanged() {
    this.emitPageChangeIfNeeded();
  }

  onPageChange(event: any) {
  this.queryParams = {
    ...this.queryParams,
    page: event.page
  };
}



  private emitPageChangeIfNeeded() {
    if (!this.gridApi) return;

    const currentPage0 = this.gridApi.paginationGetCurrentPage(); // 0-based
    const pageSize = this.gridApi.paginationGetPageSize();

    if (currentPage0 === this.lastPage && pageSize === this.lastPageSize)
      return;

    this.lastPage = currentPage0;
    this.lastPageSize = pageSize;

    // Convert to 1-based for API
    const page = currentPage0 + 1;

    // ✅ Parent should call API with {page, pageSize}
    this.pageChange.emit({ page, pageSize });
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.createRangeChart({
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: this.columnDefs.map((col) => col.field || ''),
      },
      chartType: 'groupedColumn',
    });
  }
  updateChart(chartRef?: ChartRef | undefined) {
    if (this.chartRef !== chartRef) {
      // Destroy previous chart if it exists
      this.chartRef?.destroyChart();
    }
    this.chartRef = chartRef;
    this.createdTime = new Date().toLocaleString();
  }
  @ViewChild('chartParent') chartParent?: ElementRef;

  // Arrow function used to correctly bind this to the component
  createChartContainer = (chartRef: ChartRef) => {
    this.updateChart(chartRef);
    this.chartParent?.nativeElement.appendChild(chartRef.chartElement);
  };

  onSearch(value: string) {
  this.searchValue = value;
  if (this.gridApi) {
    this.gridApi.setGridOption('quickFilterText', value);
  }
}
}
