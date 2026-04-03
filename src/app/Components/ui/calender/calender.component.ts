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
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calender.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalenderComponent),
      multi: true,
    },
  ],
})
export class CalenderComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() min?: string;
  @Input() max?: string;

  value: string = '';

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    if (!value) {
      this.value = '';
      return;
    }

    // Accept Date object or string
    if (value instanceof Date) {
      this.value = value.toISOString().split('T')[0];
    } else {
      this.value = value;
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
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  markTouched() {
    this.onTouched();
  }
}
