import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type TableInputType = 
  | 'text' 
  | 'number' 
  | 'date' 
  | 'checkbox' 
  | 'readonly'
  | 'date-with-checkbox'
  | 'file';

export interface TableColumn {
  field: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  inputType?: TableInputType;
  readonly?: boolean;
  checkboxLabel?: string;
}

export interface TableRow {
  [key: string]: any;
  id?: string | number;
}

@Component({
  selector: 'app-reusable-input-table-with-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reusable-input-table-with-date-picker.component.html',
})
export class ReusableInputTableWithDatePickerComponent {
  @Input() data: TableRow[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() showSerialNumber: boolean = true;
  @Input() serialNumberHeader: string = 'Sr No.';
  @Input() serialNumberWidth: string = 'auto';
  
  @Output() dataChange = new EventEmitter<TableRow[]>();
  @Output() cellChange = new EventEmitter<{rowIndex: number, field: string, value: any}>();

  constructor(@Inject(DOCUMENT) public document: Document) {}

  onInputChange(rowIndex: number, field: string, value: any): void {
    this.data[rowIndex][field] = value;
    this.cellChange.emit({ rowIndex, field, value });
    this.dataChange.emit([...this.data]);
  }

  onDateChange(rowIndex: number, field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onInputChange(rowIndex, field, input.value);
  }

  onCheckboxChange(rowIndex: number, field: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.onInputChange(rowIndex, field, checkbox.checked);
  }

  onFileChange(rowIndex: number, field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.onInputChange(rowIndex, field, file.name);
    }
  }

  formatDate(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }
}
