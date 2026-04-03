# Reusable Input Table with Date Picker - Usage Guide

## Overview
The `app-reusable-input-table-with-date-picker` component is a flexible table component that supports various input types including text, number, date, checkbox, and date-with-checkbox combinations.

## Component Location
`src/app/Components/reusable-input-table-with-date-picker/reusable-input-table-with-date-picker.component.ts`

## Basic Usage

### 1. Import the Component

```typescript
import { ReusableInputTableWithDatePickerComponent, TableColumn, TableRow } from '../../../../../Components/reusable-input-table-with-date-picker/reusable-input-table-with-date-picker.component';
```

### 2. Define Table Columns

```typescript
reportColumns: TableColumn[] = [
  { field: 'description', header: 'Description', width: '200px', inputType: 'text' },
  { field: 'circumferenceInches', header: 'Circumference Inches', width: '150px', inputType: 'number' },
  { field: 'lengthFathomas', header: 'Length Fathomas', width: '150px', inputType: 'number' },
  { field: 'whenAndWhereSupplied', header: 'When and Where Supplied', width: '200px', inputType: 'text' },
  { field: 'examined', header: 'Examined', width: '180px', inputType: 'date-with-checkbox', checkboxLabel: '✓' },
  { field: 'oiled', header: 'Oiled', width: '180px', inputType: 'date-with-checkbox', checkboxLabel: '✓' },
  { field: 'tested', header: 'Tested', width: '180px', inputType: 'date-with-checkbox', checkboxLabel: '✓' },
  { field: 'condition', header: 'Condition', width: '150px', inputType: 'text' },
];
```

### 3. Initialize Table Data

```typescript
reportData: TableRow[] = [
  { 
    id: 1, 
    description: 'Steel wire Hawsers', 
    circumferenceInches: '', 
    lengthFathomas: '', 
    whenAndWhereSupplied: '', 
    examined_date: '', 
    examined_checkbox: false, 
    oiled_date: '', 
    oiled_checkbox: false, 
    tested_date: '', 
    tested_checkbox: false, 
    condition: '' 
  },
  // ... more rows
];
```

**Important:** For `date-with-checkbox` input type, use the pattern:
- Field name: `examined`
- Date field: `examined_date`
- Checkbox field: `examined_checkbox`

### 4. Use in Template

```html
<app-reusable-input-table-with-date-picker
    [data]="reportData"
    [columns]="reportColumns"
    [showSerialNumber]="true"
    (cellChange)="handleTableChange($event.rowIndex, $event.field, $event.value)"
    (dataChange)="reportData = $event">
</app-reusable-input-table-with-date-picker>
```

### 5. Handle Data Changes

```typescript
handleTableChange(rowIndex: number, field: string, value: any): void {
  this.reportData[rowIndex][field] = value;
  // Update form arrays or perform other actions
}
```

## Input Types

### Available Input Types

1. **`'text'`** - Text input field
2. **`'number'`** - Number input field
3. **`'date'`** - Date picker
4. **`'checkbox'`** - Checkbox input
5. **`'readonly'`** - Read-only display
6. **`'date-with-checkbox'`** - Date picker with checkbox (e.g., Examined, Oiled, Tested)

### Date with Checkbox Pattern

When using `'date-with-checkbox'`:
- The field name in columns should be the base name (e.g., `'examined'`)
- In your data object, use:
  - `examined_date` for the date value
  - `examined_checkbox` for the checkbox value

Example:
```typescript
{ field: 'examined', header: 'Examined', inputType: 'date-with-checkbox' }

// In data:
{
  examined_date: '2024-01-15',
  examined_checkbox: true
}
```

## Column Configuration Options

```typescript
interface TableColumn {
  field: string;              // Field name in data object
  header: string;             // Column header text
  width?: string;             // Column width (e.g., '200px', '150px')
  align?: 'left' | 'center' | 'right';  // Text alignment
  inputType?: TableInputType; // Input type (see above)
  readonly?: boolean;         // Make field readonly
  checkboxLabel?: string;     // Label for checkbox (e.g., '✓')
}
```

## Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `TableRow[]` | `[]` | Array of row data objects |
| `columns` | `TableColumn[]` | `[]` | Array of column definitions |
| `showSerialNumber` | `boolean` | `true` | Show serial number column |
| `serialNumberHeader` | `string` | `'Sr No.'` | Header text for serial number column |

## Component Outputs

| Output | Event Data | Description |
|--------|------------|-------------|
| `cellChange` | `{rowIndex: number, field: string, value: any}` | Emitted when a cell value changes |
| `dataChange` | `TableRow[]` | Emitted when data array changes |

## Complete Example

```typescript
// Component TypeScript
export class MyComponent implements OnInit {
  reportData: TableRow[] = [];
  reportColumns: TableColumn[] = [
    { field: 'description', header: 'Description', width: '200px', inputType: 'text' },
    { field: 'examined', header: 'Examined', width: '180px', inputType: 'date-with-checkbox', checkboxLabel: '✓' },
  ];

  ngOnInit(): void {
    this.reportData = [
      { 
        id: 1, 
        description: 'Item 1', 
        examined_date: '', 
        examined_checkbox: false 
      }
    ];
  }

  handleTableChange(rowIndex: number, field: string, value: any): void {
    this.reportData[rowIndex][field] = value;
  }
}
```

```html
<!-- Component Template -->
<app-reusable-input-table-with-date-picker
    [data]="reportData"
    [columns]="reportColumns"
    [showSerialNumber]="true"
    (cellChange)="handleTableChange($event.rowIndex, $event.field, $event.value)"
    (dataChange)="reportData = $event">
</app-reusable-input-table-with-date-picker>
```

## Styling

The component uses Tailwind CSS classes and includes:
- Green header background (`bg-[#1a2746]`)
- Alternating row colors (white/gray-50)
- Hover effects
- Responsive design with horizontal scrolling

## Notes

- The component automatically handles serial numbers if `showSerialNumber` is true
- All inputs are two-way bound through events
- The table supports horizontal scrolling for wide tables
- Date fields use HTML5 date input type
- Checkboxes can have optional labels via `checkboxLabel` property
