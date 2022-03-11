import { FormGroup } from '@angular/forms';
export interface DateFilter {
    nombreTabla: string;
    rango: object;
}


export interface DateFilterFormGroup {
    Formulario: FormGroup;
    nombreTabla: string;
}
