import { Component, Input, forwardRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];
  @Input() placeholder = '--Select--';

  /** 👇 Allow manual disable too (besides formControl) */
  @Input() disabled = false;

  isOpen = false;
  value: any = '';

  private onChange = (value: any) => {};
  private onTouched = () => {};

  toggle() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  }

  select(option: any) {
    if (this.disabled) return;

    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.isOpen = false;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** 👇 IMPORTANT: Angular Forms will call this */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent) {
    if (this.disabled) return;

    const target = event.target as HTMLElement;
    if (!target.closest('.select-container')) {
      this.isOpen = false;
    }
  }

  get selectedLabel() {
    return (
      this.options.find((o) => o.value === this.value)?.label ||
      this.placeholder
    );
  }
}
