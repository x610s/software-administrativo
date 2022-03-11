import { FormControl, FormGroup } from '@angular/forms';
import { MultiSelect } from 'src/app/models/interfaces/Multi-Select';
export class FilterHelper {


   static CrearFormFiltrarFechas(form: FormGroup[], Fechas:MultiSelect[] ) {
        let forms:FormGroup[] = [];
        Fechas.forEach(element => {
             let form : FormGroup = new FormGroup({
                start: new FormControl(''),
                end: new FormControl(''),
            })
            forms.push(form)
        });
        return forms;
    }
}
