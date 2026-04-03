import {
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-month-year-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month-year-calendar.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthYearCalendarComponent),
      multi: true,
    },
  ],
})
export class MonthYearCalendarComponent implements ControlValueAccessor {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() min?: string; // format: YYYY-MM
  @Input() max?: string; // format: YYYY-MM

  value: string = '';        // internal value (YYYY-MM)
  displayValue: string = ''; // formatted value (MM/YYYY)

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    if (!value) {
      this.value = '';
      this.displayValue = '';
      return;
    }

    // Accept MM/YYYY format
    if (value.includes('/')) {
      const [month, year] = value.split('/');
      this.value = `${year}-${month}`;
      this.displayValue = value;
    } else {
      this.value = value;
      const [year, month] = value.split('-');
      this.displayValue = `${month}/${year}`;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const rawValue = (event.target as HTMLInputElement).value; // YYYY-MM
    this.value = rawValue;

    if (!rawValue) {
      this.displayValue = '';
      this.onChange('');
      return;
    }

    const [year, month] = rawValue.split('-');
    this.displayValue = `${month}/${year}`;

    // Emit in MM/YYYY format
    this.onChange(this.displayValue);
  }

  markTouched() {
    this.onTouched();
  }
}
