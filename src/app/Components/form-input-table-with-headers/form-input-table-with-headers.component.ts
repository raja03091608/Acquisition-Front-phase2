import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  TemplateRef,
  AfterContentInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ReusableTableColumnWithHeaders {
  field: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  fieldType?:
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'time'
    | 'textarea'
    | 'drop-down'
    | 'checkbox';
  options?: { label: string; value: any }[];
  template?: string;
  hidden?: boolean;
  sticky?: 'left' | 'right';
  // NEW (optional)
  colspan?: number;
  rowspan?: number;
}

export interface ReusableHeaderCell {
  header: string;
  colspan?: number;
  rowspan?: number;
  width?: string;
  align?: 'left' | 'center' | 'right';
  hidden?: boolean;
  sticky?: 'left' | 'right';
}

@Component({
  selector: 'app-form-input-table-with-headers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-input-table-with-headers.component.html',
})
export class FormInputTableWithHeaders implements AfterContentInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: ReusableTableColumnWithHeaders[] = [];
  @Input() headerRows?: ReusableHeaderCell[][];

  @Output() actionClick = new EventEmitter<{
    type: 'calculate' | 'delete';
    row: any;
    index: number;
  }>();

  @Output() valueChanged = new EventEmitter<{
    index: number;
    field: string;
    value: any;
  }>();

  visibleColumns: ReusableTableColumnWithHeaders[] = [];

  ngOnChanges() {
    this.visibleColumns = this.columns.filter((col) => !col.hidden);
  }

  get filteredHeaderRows() {
    if (!this.headerRows?.length) return [];

    const visibleHeaders = this.visibleColumns.map((c) => c.header);

    return this.headerRows.map((row) =>
      row.filter((cell) => {
        // keep group headers (colspan)
        if (cell.colspan) return true;

        return visibleHeaders.includes(cell.header);
      }),
    );
  }

  isStickyRight(header: string): boolean {
    const column = this.visibleColumns.find((c) => c.header === header);
    return column?.sticky === 'right';
  }
  onAction(type: 'calculate' | 'delete', row: any, index: number) {
    this.actionClick.emit({ type, row, index });
  }

  @ContentChildren(TemplateRef)
  templatesList!: QueryList<TemplateRef<any>>;

  templates: Record<string, TemplateRef<any>> = {};

  ngAfterContentInit(): void {
    this.templatesList.forEach((tpl: any) => {
      const name = tpl._declarationTContainer?.localNames?.[0];
      if (name) {
        this.templates[name] = tpl;
      }
    });
  }
}
