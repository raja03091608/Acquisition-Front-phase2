import {
      Component,
      ElementRef,
      forwardRef,
      HostListener,
      Input
    } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import {
      ControlValueAccessor,
      FormsModule,
      NG_VALUE_ACCESSOR
    } from '@angular/forms';

    export interface MultiSelectOption {
      label: string;
      value: string | number;
      disabled?: boolean;
    }

    @Component({
      selector: 'app-multiselect',
      standalone: true,
      imports: [CommonModule, FormsModule],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => MultiSelectDropdownComponent),
          multi: true
        }
      ],
      template: `
        <div class="relative w-full">
          <label *ngIf="label" class="mb-0.5 block text-[11px] font-semibold uppercase tracking-[1.4px] text-slate-600">
            {{ label }}
            <span *ngIf="required" class="text-red-500">*</span>
          </label>

          <div
            class="min-h-[44px] w-full cursor-pointer rounded-none border border-slate-500 bg-white px-3 py-2 flex items-center justify-between gap-2 shadow-[0_2px_6px_rgba(15,23,42,0.08)]"
            [class.opacity-60]="isDisabled"
            [class.pointer-events-none]="isDisabled"
            (click)="toggleDropdown()"
          >
            <div class="flex flex-1 flex-wrap gap-2">
              <ng-container *ngIf="selectedOptions.length > 0; else placeholderTpl">
                <span
                  *ngFor="let item of visibleSelectedOptions"
                  class="inline-flex items-center gap-2 border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {{ item.label }}
                  <button
                    type="button"
                    class="text-slate-600 hover:text-red-600"
                    (click)="removeItem(item.value, $event)"
                  >
                    ×
                  </button>
                </span>

                <span
                  *ngIf="extraSelectedCount > 0"
                  class="inline-flex items-center border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  +{{ extraSelectedCount }} more
                </span>
              </ng-container>

              <ng-template #placeholderTpl>
                <span class="text-sm text-slate-500">{{ placeholder }}</span>
              </ng-template>
            </div>

            <span class="text-[11px] text-[#1a2b48]/70"><i class="fa-solid font-light" [ngClass]="isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i></span>
          </div>

          <div
            *ngIf="isOpen"
            class="absolute z-50 mt-1 w-full rounded-none border border-slate-500 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.18)]"
          >
            <div *ngIf="searchable" class="border-b border-slate-200 p-2">
              <input
                type="text"
                [(ngModel)]="searchTerm"
                placeholder="Search..."
                class="w-full rounded-none border border-slate-500 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
                (click)="$event.stopPropagation()"
              />
            </div>

            <div
              *ngIf="selectAllEnabled"
              class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2"
            >
              <button
                type="button"
                class="text-xs font-semibold uppercase tracking-wide text-[#1a2b48] hover:text-slate-900"
                (click)="selectAll($event)"
              >
                Select All
              </button>

              <button
                type="button"
                class="text-xs font-semibold uppercase tracking-wide text-slate-600 hover:text-red-700"
                (click)="clearAll($event)"
              >
                Clear
              </button>
            </div>

            <div class="max-h-60 overflow-y-auto p-2">
              <div
                *ngFor="let option of filteredOptions"
                class="flex cursor-pointer items-center gap-3 rounded-none px-3 py-2 hover:bg-slate-100"
                [class.opacity-50]="option.disabled"
                (click)="toggleOption(option)"
              >
                <input
                  type="checkbox"
                  [checked]="isSelected(option.value)"
                  [disabled]="option.disabled"
                  (click)="$event.stopPropagation()"
                  (change)="toggleOption(option)"
                />
                <span class="text-sm text-slate-700">{{ option.label }}</span>
              </div>

              <div *ngIf="filteredOptions.length === 0" class="px-3 py-4 text-center text-sm text-slate-400">
                No options found
              </div>
            </div>
          </div>
        </div>
      `
    })
    export class MultiSelectDropdownComponent implements ControlValueAccessor {
      @Input() label = '';
      @Input() placeholder = 'Select options';
      @Input() options: MultiSelectOption[] = [];
      @Input() searchable = true;
      @Input() selectAllEnabled = true;
      @Input() required = false;
      @Input() maxVisibleTags = 2;

      isOpen = false;
      isDisabled = false;
      searchTerm = '';
      selectedValues: (string | number)[] = [];

      private onChange: (value: (string | number)[]) => void = () => {};
      private onTouched: () => void = () => {};

      constructor(private elementRef: ElementRef) {}

      writeValue(value: (string | number)[] | null): void {
        this.selectedValues = Array.isArray(value) ? value : [];
      }

      registerOnChange(fn: (value: (string | number)[]) => void): void {
        this.onChange = fn;
      }

      registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
      }

      setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
      }

      toggleDropdown(): void {
        if (this.isDisabled) return;
        this.isOpen = !this.isOpen;
        this.onTouched();
      }

      get filteredOptions(): MultiSelectOption[] {
        if (!this.searchTerm.trim()) return this.options;
        const term = this.searchTerm.toLowerCase();
        return this.options.filter(option =>
          option.label.toLowerCase().includes(term)
        );
      }

      get selectedOptions(): MultiSelectOption[] {
        return this.options.filter(option =>
          this.selectedValues.includes(option.value)
        );
      }

      get visibleSelectedOptions(): MultiSelectOption[] {
        return this.selectedOptions.slice(0, this.maxVisibleTags);
      }

      get extraSelectedCount(): number {
        return Math.max(this.selectedOptions.length - this.maxVisibleTags, 0);
      }

      isSelected(value: string | number): boolean {
        return this.selectedValues.includes(value);
      }

      toggleOption(option: MultiSelectOption): void {
        if (option.disabled || this.isDisabled) return;

        if (this.isSelected(option.value)) {
          this.selectedValues = this.selectedValues.filter(v => v !== option.value);
        } else {
          this.selectedValues = [...this.selectedValues, option.value];
        }

        this.propagateChanges();
      }

      removeItem(value: string | number, event: MouseEvent): void {
        event.stopPropagation();
        this.selectedValues = this.selectedValues.filter(v => v !== value);
        this.propagateChanges();
      }

      selectAll(event: MouseEvent): void {
        event.stopPropagation();
        const enabledValues = this.filteredOptions
          .filter(option => !option.disabled)
          .map(option => option.value);

        this.selectedValues = Array.from(new Set([...this.selectedValues, ...enabledValues]));
        this.propagateChanges();
      }

      clearAll(event: MouseEvent): void {
        event.stopPropagation();
        this.selectedValues = [];
        this.propagateChanges();
      }

      propagateChanges(): void {
        this.onChange(this.selectedValues);
        this.onTouched();
      }

      @HostListener('document:click', ['$event'])
      onDocumentClick(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.isOpen = false;
        }
      }
    }
