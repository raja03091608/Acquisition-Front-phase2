import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Printer, Save } from 'lucide-angular';

/** Cell type: determines how the cell is rendered and edited */
export type DynamicTableColumnType =
  | 'serial'
  | 'text' // readonly display text (e.g. CHECKS)
  | 'input' // text/textarea input (e.g. ACTUAL VALUE, REMARKS)
  | 'desired' // display desired value (e.g. DESIRED VALUE)
  | 'date' // date picker
  | 'action'
  | 'time'; // button (e.g. print/save)

export interface DynamicTableColumnConfig {
  /** Unique key for this column (used as field name in row data) */
  key: string;
  /** Header label shown in the table */
  header: string;
  /** How to render the cell */
  type: DynamicTableColumnType;
  /** Optional width (e.g. '80px', '15%', 'auto') */
  width?: string;
  /** Alignment: left | center | right */
  align?: 'left' | 'center' | 'right';
  /** Placeholder for input/date cells */
  placeholder?: string;
  /** For type 'action': button label or use actionIcon */
  actionLabel?: string;
  /** For type 'action': icon name - 'printer' | 'save' (lucide) */
  actionIcon?: 'printer' | 'save';
  /** For type 'input': use textarea (resizable) */
  multiline?: boolean;
}

export interface DynamicTableRow {
  [key: string]: any;
  /** Optional id for tracking */
  id?: string | number;
}

@Component({
  selector: 'app-reusable-dynamic-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './reusable-dynamic-table.component.html',
  styleUrls: ['./reusable-dynamic-table.component.css'],
})
export class ReusableDynamicTableComponent implements OnInit {
  /** Column definitions – add/remove to change headers and columns */
  @Input() columns: DynamicTableColumnConfig[] = [];

  /** Row data – each item is a row; keys should match column keys */
  @Input() data: DynamicTableRow[] = [];

  /** Show "Add row" button below table */
  @Input() showAddRow = true;

  /** Show "Remove row" button on each row */
  @Input() showRemoveRow = false;

  /** Show "Add column" / "Remove column" controls (for column config) */
  @Input() showColumnControls = false;

  /** Serial number column label (when using type 'serial') */
  @Input() serialHeader = 'SER';

  /** Show action column (save/print button). When false, action column is hidden. */
  @Input() showActionColumn = false;

  /** Optional centered banner row rendered inside the table body (e.g. "INSPECT THE FOLLOWING"). */
  @Input() tableBannerText: string | null = null;

  /**
   * Optional banner serial value shown in the first (serial) column.
   * Example: 44 or '(a)'. When not provided, banner spans full width.
   */
  @Input() tableBannerSer: string | number | null = null;

  /** Emitted when any cell value changes */
  @Output() dataChange = new EventEmitter<DynamicTableRow[]>();

  /** Emitted when a cell is edited (rowIndex, field key, value) */
  @Output() cellChange = new EventEmitter<{
    rowIndex: number;
    field: string;
    value: any;
  }>();

  /** Emitted when row action button is clicked (rowIndex, row data) */
  @Output() rowAction = new EventEmitter<{
    rowIndex: number;
    row: DynamicTableRow;
  }>();

  /** Emitted when a new row is added (new row template) */
  @Output() rowAdded = new EventEmitter<DynamicTableRow>();

  /** Emitted when a row is removed (rowIndex) */
  @Output() rowRemoved = new EventEmitter<number>();

  /** Emitted when columns are added/removed (use with showColumnControls) */
  @Output() columnsChange = new EventEmitter<DynamicTableColumnConfig[]>();
  // ------------------ FOR TIME SELECTION
  hours = Array.from({ length: 24 }, (_, i) => i);
  minutes = Array.from({ length: 60 }, (_, i) => i);
  seconds = Array.from({ length: 60 }, (_, i) => i);

  getTimePart(value: string, part: 'hh' | 'mm' | 'ss'): string {
    if (!value) return '';
    const [hh, mm, ss] = value.split(':');
    return part === 'hh' ? hh : part === 'mm' ? mm : ss;
  }

  onTimeChange(
    rowIndex: number,
    key: string,
    event: any,
    part: 'hh' | 'mm' | 'ss',
  ) {
    const existing = this.getRowValue(this.data[rowIndex], key) || '';
    let [hh = '', mm = '', ss = ''] = existing.split(':');

    const val = event.target.value;

    if (part === 'hh') hh = val;
    if (part === 'mm') mm = val;
    if (part === 'ss') ss = val;

    const formatted = `${hh || '00'}:${mm || '00'}:${ss || '00'}`;

    this.onCellChange(rowIndex, key, formatted);
  }

  /** Default columns matching the image if none provided */
  private readonly defaultColumns: DynamicTableColumnConfig[] = [
    {
      key: 'ser',
      header: 'SER',
      type: 'serial',
      width: '48px',
      align: 'center',
    },
    { key: 'checks', header: 'CHECKS', type: 'text', align: 'left' },
    {
      key: 'desiredValue',
      header: 'DESIRED VALUE',
      type: 'desired',
      align: 'center',
    },
    {
      key: 'actualValue',
      header: 'ACTUAL VALUE',
      type: 'input',
      align: 'left',
      placeholder: '',
      multiline: true,
    },
    {
      key: 'date',
      header: 'DATE',
      type: 'date',
      align: 'left',
      placeholder: 'DD/MM/YYYY',
    },
    {
      key: 'remarks',
      header: 'REMARKS',
      type: 'input',
      align: 'left',
      placeholder: '',
      multiline: true,
    },
    {
      key: 'action',
      header: 'ACTION',
      type: 'action',
      width: '56px',
      align: 'center',
      actionIcon: 'save',
    },
  ];

  readonly PrinterIcon = Printer;
  readonly SaveIcon = Save;

  ngOnInit(): void {
    if (!this.columns || this.columns.length === 0) {
      this.columns = [...this.defaultColumns];
    }
  }

  get displayColumns(): DynamicTableColumnConfig[] {
    return this.columns.length ? this.columns : this.defaultColumns;
  }

  /** Columns to render; excludes action column when showActionColumn is false */
  get visibleColumns(): DynamicTableColumnConfig[] {
    const cols = this.displayColumns;
    if (this.showActionColumn) return cols;
    return cols.filter((c) => c.type !== 'action');
  }

  get hasSerialColumn(): boolean {
    return this.visibleColumns.some((c) => c.type === 'serial');
  }

  get bannerSecondColspan(): number {
    const base = this.visibleColumns.length - 1; // after serial
    return Math.max(1, base + (this.showRemoveRow ? 1 : 0));
  }

  onCellChange(rowIndex: number, field: string, value: any): void {
    if (!this.data[rowIndex]) return;
    this.data[rowIndex][field] = value;
    this.cellChange.emit({ rowIndex, field, value });
    this.dataChange.emit([...this.data]);
  }

  onRowAction(rowIndex: number): void {
    const row = this.data[rowIndex];
    if (row) {
      this.rowAction.emit({ rowIndex, row });
    }
  }

  addRow(): void {
    const newRow: DynamicTableRow = {};
    this.displayColumns.forEach((col) => {
      if (col.type === 'serial') return;
      newRow[col.key] = col.type === 'date' ? '' : '';
    });
    this.data.push(newRow);
    this.dataChange.emit([...this.data]);
    this.rowAdded.emit(newRow);
  }

  removeRow(index: number): void {
    this.data.splice(index, 1);
    this.dataChange.emit([...this.data]);
    this.rowRemoved.emit(index);
  }

  addColumn(): void {
    const newKey = `col_${this.columns.length + 1}`;
    this.columns = [
      ...this.columns,
      {
        key: newKey,
        header: `Column ${this.columns.length + 1}`,
        type: 'input',
        align: 'left',
      },
    ];
    this.columnsChange.emit(this.columns);
  }

  removeColumn(index: number): void {
    if (this.columns.length <= 1) return;
    this.columns = this.columns.filter((_, i) => i !== index);
    this.columnsChange.emit(this.columns);
  }

  formatDateForInput(value: any): string {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  getRowValue(row: DynamicTableRow, key: string): any {
    return row[key] ?? '';
  }

  /** When true, SER cell is left blank (for sub-items). Row must set e.g. ser: '' */
  isSerialBlank(row: DynamicTableRow, serialKey: string): boolean {
    return (
      serialKey in row && (row[serialKey] === '' || row[serialKey] === null)
    );
  }

  /**
   * Logical serial number: 1-based count of non-blank serial rows up to this row.
   * So after 7 with 6 blank sub-rows, the next row shows 8 (not 14).
   */
  getSerialDisplay(rowIndex: number, serialKey: string): string {
    if (rowIndex < 0 || rowIndex >= this.data.length) return '';
    const row = this.data[rowIndex];
    if (this.isSerialBlank(row, serialKey)) return '';

    // If caller explicitly provides a serial label (e.g. '(a)', '(g)'),
    // show it as-is instead of auto-numbering.
    if (serialKey in row) {
      const v = row[serialKey];
      if (typeof v === 'string' && v.trim() !== '') return v;
      if (typeof v === 'number') return `${v}.`;
    }

    let count = 0;
    for (let i = 0; i <= rowIndex; i++) {
      if (!this.isSerialBlank(this.data[i], serialKey)) count++;
    }
    return count + '.';
  }
}
