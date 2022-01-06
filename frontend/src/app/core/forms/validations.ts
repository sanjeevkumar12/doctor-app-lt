import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DAValidators {
  static REGEX_PASSWORD: RegExp = /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{6,30}$/
  static PHONE_REGEXP : RegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    
    static validate_password(password: any): any{
        if (password.pristine) {
            return null;
        }
        password.markAsTouched();
        if (DAValidators.REGEX_PASSWORD.test(password.value)) {
            return null;
         }   return {
            invalidPassword: true
         };
    }
    static matchPassword(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
          const control = controls.get(controlName);
          const checkControl = controls.get(checkControlName);
    
          if (checkControl?.errors && !checkControl.errors.matching) {
            return null;
          }
    
          if (control?.value !== checkControl?.value && checkControlName) {
            controls.get(checkControlName)?.setErrors({ matching: true });
            return { matching: true };
          } else {
            return null;
          }
        };
      }
    static validate_phonenumber(number: AbstractControl): any {
        if (number.pristine) {
        return null;
      }
      number.markAsTouched(); if (DAValidators.PHONE_REGEXP.test(number.value)) {
        return null;
        }   return {
        invalidNumber: true
        };
    }
}