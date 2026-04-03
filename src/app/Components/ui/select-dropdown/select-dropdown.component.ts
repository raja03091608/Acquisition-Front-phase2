import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDropdownComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full">
      <label
        *ngIf="label"
        class="mb-0.5 block text-[11px] font-semibold uppercase tracking-[1.4px] text-slate-600"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>

      <div
        class="min-h-[44px] w-full cursor-pointer rounded-none border border-slate-500 bg-white px-3 py-2 flex items-center justify-between gap-2 shadow-[0_2px_6px_rgba(15,23,42,0.08)]"
        [class.opacity-60]="disabled"
        [class.pointer-events-none]="disabled"
        (click)="toggle()"
      >
        <div class="flex flex-1 flex-wrap gap-2">
          <span
            class="text-sm"
            [ngClass]="hasSelectedOption ? 'text-slate-700' : 'text-slate-500'"
          >
            {{ selectedLabel }}
          </span>
        </div>

        <span class="text-[11px] text-[#1a2b48]/70">
          <i
            class="fa-solid font-light"
            [ngClass]="isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
          ></i>
        </span>
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
            (input)="onSearchChange()"
          />
        </div>

        <div class="max-h-60 overflow-y-auto p-2">
          <div *ngIf="isLoading" class="px-3 py-4 text-center text-sm text-slate-400">
            Loading...
          </div>

          <ng-container *ngIf="!isLoading">
            <div
              *ngFor="let option of displayedOptions"
              class="flex cursor-pointer items-center gap-3 rounded-none px-3 py-2 hover:bg-slate-100"
              [class.bg-slate-100]="option.value === value"
              (click)="select(option)"
            >
              <span class="text-sm text-slate-700">{{ option.label }}</span>
            </div>

            <div
              *ngIf="displayedOptions.length === 0"
              class="px-3 py-4 text-center text-sm text-slate-400"
            >
              No options found
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export class SelectDropdownComponent
  implements ControlValueAccessor, OnInit, OnChanges, OnDestroy
{
  constructor(
    private host: ElementRef<HTMLElement>,
    private http: HttpClient
  ) {}

  @Input() options: SelectOption[] = [];
  @Input() placeholder = '--Select--';
  @Input() label = '';
  @Input() required = false;
  @Input() searchable = true;
  @Input() disabled = false;

  /**
   * Agar apiUrl milega to remote search hoga
   * Example: /api/equipments?search=
   * Agar blank/null hoga to local options me search hoga
   */
  @Input() apiUrl = '';

  /**
   * API response mapping keys
   * Default: {label, value}
   * Agar API me name/id aaye to ye use karo
   */
  @Input() labelKey = 'label';
  @Input() valueKey = 'value';

  @Input() debounceTimeMs = 300;
  @Input() minSearchLength = 1;

  private hasLoaded = false;

  isOpen = false;
  isLoading = false;
  searchTerm = '';
  value: any = '';

  displayedOptions: SelectOption[] = [];

  private searchSubject = new Subject<string>();
  private subscription = new Subscription();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  // ngOnInit(): void {
  //   this.displayedOptions = [...this.options];
  //   this.initSearchStream();
  // }
ngOnInit(): void {
  this.displayedOptions = [];
  this.isLoading = false;
  this.initSearchStream();
}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && !this.useRemoteSearch) {
      this.displayedOptions = this.filterLocalOptions(this.searchTerm);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get useRemoteSearch(): boolean {
    return !!this.apiUrl?.trim();
  }

  private initSearchStream(): void {
    const sub = this.searchSubject
      .pipe(
        debounceTime(this.debounceTimeMs),
        distinctUntilChanged(),
        switchMap((term: string) => {
          if (this.useRemoteSearch) {
            return this.searchFromApi(term);
          }
          return of(this.filterLocalOptions(term));
        })
      )
      .subscribe((result: SelectOption[]) => {
        this.displayedOptions = result;
        this.isLoading = false;
      });

    this.subscription.add(sub);
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  private filterLocalOptions(term: string): SelectOption[] {
    const search = term.trim().toLowerCase();

    if (!search) return [...this.options];

    return this.options.filter((option) =>
      String(option.label || '')
        .toLowerCase()
        .includes(search)
    );
  }

  // private searchFromApi(term: string) {
  //   const search = term.trim();

  //   if (search.length < this.minSearchLength) {
  //     this.isLoading = false;
  //     return of([]);
  //   }

  //   this.isLoading = true;

  //   // const finalUrl = `${this.apiUrl}${encodeURIComponent(search)}`;
  //   const finalUrl = `${this.apiUrl}&search=${encodeURIComponent(search)}`

  //   return this.http.get<any>(environment.apiUrl + finalUrl).pipe(
  //     map((response) => this.normalizeApiResponse(response)),
  //     catchError((error) => {
  //       console.error('Select search API error:', error);
  //       return of([]);
  //     })
  //   );
  // }

private searchFromApi(term: string) {
  const search = term.trim();

  if (!search) {
    return of(this.displayedOptions); // ❌ no loading
  }

  this.isLoading = true;

  const finalUrl = `${this.apiUrl}&search=${encodeURIComponent(search)}`;

  return this.http.get<any>(environment.apiUrl + finalUrl).pipe(
    map((response) => this.normalizeApiResponse(response)),
    catchError(() => of([]))
  );
}

  /**
   * API response ko SelectOption[] me convert karega
   * Supported:
   * 1. [{label:'A', value:1}]
   * 2. [{name:'A', id:1}]  via labelKey/valueKey
   * 3. {results:[...]}
   * 4. {data:[...]}
   */
  private normalizeApiResponse(response: any): SelectOption[] {
    let data: any[] = [];

    if (Array.isArray(response)) {
      data = response;
    } else if (Array.isArray(response?.results)) {
      data = response.results;
    } else if (Array.isArray(response?.data)) {
      data = response.data;
    } else {
      data = [];
    }

    return data.map((item: any) => ({
      label: item?.[this.labelKey] ?? item?.label ?? '',
      value: item?.[this.valueKey] ?? item?.value ?? '',
    }));
  }

//   toggle(): void {
//     if (this.disabled) return;

//     this.isOpen = !this.isOpen;

//     if (this.isOpen) {
//     if (this.useRemoteSearch) {
//   this.isLoading = true;

//   this.http.get<any>(environment.apiUrl + this.apiUrl).pipe(
//     map((res: any) => this.normalizeApiResponse(res)),
//     catchError(() => of([]))
//   ).subscribe((data) => {
//     this.displayedOptions = data;
//     this.isLoading = false;
//   });
// } else {
//         this.displayedOptions = this.filterLocalOptions(this.searchTerm);
//       }
//     } else {
//       this.searchTerm = '';
//       this.isLoading = false;
//       if (!this.useRemoteSearch) {
//         this.displayedOptions = [...this.options];
//       } else {
//         this.displayedOptions = [];
//       }
//     }
//   }
toggle(): void {
  if (this.disabled) return;

  this.isOpen = !this.isOpen;

  if (this.isOpen) {
    if (this.useRemoteSearch) {

      // ✅ agar already loaded hai → loading mat dikhao
      if (this.hasLoaded) {
        this.isLoading = false;
        return;
      }

      this.isLoading = true;

      this.http.get<any>(environment.apiUrl + this.apiUrl).pipe(
  map((res: any) => this.normalizeApiResponse(res)),
  catchError(() => of([]))
).subscribe((data) => {

  // 🔥 FORCE UI UPDATE FIX
  setTimeout(() => {
    this.displayedOptions = data;
    this.isLoading = false;
    this.hasLoaded = true;
  }, 0);

});

    } else {
      this.displayedOptions = this.filterLocalOptions(this.searchTerm);
    }
  }
}
  select(option: SelectOption): void {
    if (this.disabled) return;

    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();

    this.isOpen = false;
    this.searchTerm = '';
    this.isLoading = false;
  }

writeValue(value: any): void {
  this.value = value;

  if (this.useRemoteSearch && value && !this.hasLoaded) {
    this.http.get<any>(environment.apiUrl + this.apiUrl).pipe(
      map((res: any) => this.normalizeApiResponse(res)),
      catchError(() => of([]))
    ).subscribe((data) => {
      this.displayedOptions = data;
      this.hasLoaded = true;
    });
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
    this.isOpen = false;
    this.isLoading = false;
  }

@HostListener('document:click', ['$event'])
closeOnOutsideClick(event: MouseEvent): void {
  if (this.disabled) return;

  const target = event.target as Node;
  if (!this.host.nativeElement.contains(target)) {
    this.isOpen = false;
    this.searchTerm = '';
    this.isLoading = false;
    // ❌ displayedOptions mat hatao
  }
}

  get selectedLabel(): string {
    return (
      this.options.find((o) => o.value === this.value)?.label ||
      this.displayedOptions.find((o) => o.value === this.value)?.label ||
      this.placeholder
    );
  }

  get hasSelectedOption(): boolean {
    return (
      this.options.some((o) => o.value === this.value) ||
      this.displayedOptions.some((o) => o.value === this.value)
    );
  }
}
