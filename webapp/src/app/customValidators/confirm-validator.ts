import { FormGroup } from '@angular/forms';

export function ConfirmValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl?.errors && !matchingControl?.errors?.confirm) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirm: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
