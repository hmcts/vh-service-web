import { AbstractControl } from '@angular/forms';

export function ValidateForWhiteSpace(control: AbstractControl) {
  if (!!control.value && control.value.trim().length > 3) {
    return null;
  }
  var result = { validInput: true };
  return result;
}
