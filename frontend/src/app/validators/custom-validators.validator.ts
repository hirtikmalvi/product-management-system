import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const dateRangeValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const fromDate = control.get('createdFromDate')?.value;
  const toDate = control.get('createdToDate')?.value;

  if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
    return { startAfterEnd: true };
  }
  return null;
};

export const priceRangeValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const minPrice = control.get('minPrice')?.value;
  const maxPrice = control.get('maxPrice')?.value;

  if (minPrice && maxPrice && minPrice > maxPrice) {
    return { minGreaterThanMax: true };
  }
  return null;
};
