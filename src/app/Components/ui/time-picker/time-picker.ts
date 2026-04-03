import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ ADD THIS
  templateUrl: './time-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor {
  @Input() label = '';
  hours = Array.from({ length: 24 }, (_, i) => i);
  minutes = Array.from({ length: 60 }, (_, i) => i);
  seconds = Array.from({ length: 60 }, (_, i) => i);

  hour: number | null = null;
  minute: number | null = null;
  second: number | null = null;

  disabled = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    if (!value) return;

    const [h, m, s] = value.split(':').map(Number);
    this.hour = h;
    this.minute = m;
    this.second = s;
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

  updateTime() {
    if (this.hour === null || this.minute === null || this.second === null)
      return;

    const time =
      this.pad(this.hour) +
      ':' +
      this.pad(this.minute) +
      ':' +
      this.pad(this.second);

    this.onChange(time);
    this.onTouched();
  }

  pad(value: number) {
    return value.toString().padStart(2, '0');
  }
}
