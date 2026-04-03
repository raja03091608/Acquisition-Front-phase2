# Reusable Dynamic Table

A fully dynamic table component that matches the checklist style: dark blue header, alternating row colors, configurable columns (SER, CHECKS, DESIRED VALUE, ACTUAL VALUE, DATE, REMARKS, ACTION), and optional add/remove rows and columns.

## Features

- **Dynamic columns** – Define columns via `columns` input; add/remove at runtime with `showColumnControls`.
- **Dynamic rows** – Pass `data` array; use "Add row" (`showAddRow`) and optional "Remove row" per row (`showRemoveRow`).
- **Cell types**: `serial` | `text` | `input` | `desired` | `date` | `action`.
- **Events**: `dataChange`, `cellChange`, `rowAction`, `rowAdded`, `rowRemoved`, `columnsChange`.

## Usage

```ts
import { ReusableDynamicTableComponent, DynamicTableColumnConfig, DynamicTableRow } from './Components/reusable-dynamic-table/reusable-dynamic-table.component';

// In your component:
columns: DynamicTableColumnConfig[] = [
  { key: 'ser', header: 'SER', type: 'serial', width: '48px', align: 'center' },
  { key: 'checks', header: 'CHECKS', type: 'text', align: 'left' },
  { key: 'desiredValue', header: 'DESIRED VALUE', type: 'desired', align: 'center' },
  { key: 'actualValue', header: 'ACTUAL VALUE', type: 'input', multiline: true },
  { key: 'date', header: 'DATE', type: 'date', placeholder: 'DD/MM/YYYY' },
  { key: 'remarks', header: 'REMARKS', type: 'input', multiline: true },
  { key: 'action', header: 'ACTION', type: 'action', actionIcon: 'printer' },
];

data: DynamicTableRow[] = [
  { checks: 'Operate mounting in manual and power modes...', desiredValue: 'SAT' },
  { checks: 'Insulation resistance', desiredValue: '>=1 M OHM' },
];

onRowAction(event: { rowIndex: number; row: DynamicTableRow }) {
  console.log('Row action', event.rowIndex, event.row);
}
```

```html
<app-reusable-dynamic-table
  [columns]="columns"
  [(data)]="data"
  [showAddRow]="true"
  [showRemoveRow]="true"
  [showColumnControls]="true"
  (rowAction)="onRowAction($event)"
  (dataChange)="data = $event">
</app-reusable-dynamic-table>
```

If you omit `columns`, the default checklist columns (SER, CHECKS, DESIRED VALUE, ACTUAL VALUE, DATE, REMARKS, ACTION) are used.
