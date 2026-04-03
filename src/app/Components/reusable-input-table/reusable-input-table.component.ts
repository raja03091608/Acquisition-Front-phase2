import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  TemplateRef,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ReusableTableColumn {
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
  hidden?: boolean;
  template?: string;
  sticky?: 'left' | 'right';
}

@Component({
  selector: 'app-reusable-input-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reusable-input-table.component.html',
})
export class ReusableInputTableComponent implements AfterContentInit {
  @Input() data: any[] = [];
  @Input() columns: ReusableTableColumn[] = [];

  isStickyRight(header: string): boolean {
    const column = this.columns.find((c) => c.header === header);
    return column?.sticky === 'right';
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

  onCheckboxChange(event: Event, row: any, field: string, value: any) {
    if (!row[field]) {
      row[field] = [];
    }

    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!row[field].includes(value)) {
        row[field].push(value);
      }
    } else {
      row[field] = row[field].filter((v: any) => v !== value);
    }
  }
}
