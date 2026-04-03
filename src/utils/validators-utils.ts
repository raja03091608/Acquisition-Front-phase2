import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function yearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const year = Number(control.value);
    const currentYear = new Date().getFullYear();

    // must be 4 digits
    if (!/^\d{4}$/.test(control.value)) {
      return { invalidYearFormat: true };
    }

    // must not be in the future
    if (year > currentYear) {
      return { futureYear: true };
    }

    return null;
  };
}
