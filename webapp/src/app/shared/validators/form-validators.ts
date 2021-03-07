import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const compareDateTime: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const opens = control.get('opens');
    const closes = control.get('closes');

    if (!!opens?.value && !!closes?.value) {
        return (new Date(`2021-01-01 ${opens?.value}`) >= (new Date(`2021-01-01 ${closes?.value}`))) ?
            { compareDateTime: true } : null;
    }

    return null;
};
