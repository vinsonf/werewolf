import { AbstractControl, FormGroup } from '@angular/forms';

export function confirmPassword(group: FormGroup) {
  console.log(group);
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { doesNotMatch: true };
}
export function passwordNeedsNumber(group: FormGroup) {
  console.log(group);
  const password = group.get('password')?.value;
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(password) ? null : { noNumber: true };
}
