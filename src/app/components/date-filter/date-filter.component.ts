import { DateHelper } from './../../helpers/DateHelper';
import { DateFilter, DateFilterFormGroup } from './../../models/interfaces/DateFilter';
import { FilterHelper } from './../../helpers/FilterHelper';
import { FormGroup } from '@angular/forms';
import { MultiSelect } from 'src/app/models/interfaces/Multi-Select';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {

  CamposParseados: DateFilter[] = [];
  FiltroFechasForm: FormGroup[] =[];
  FiltroFechasFormSinVacios: DateFilterFormGroup[] = [];
  @Input() CamposAFiltrar: MultiSelect[] = [];
  @Output() EnviarFiltroFecha = new EventEmitter<DateFilter[]>();

  constructor() {
   }

  ngOnInit(): void {
   this.FiltroFechasForm = FilterHelper.CrearFormFiltrarFechas(this.FiltroFechasForm,this.CamposAFiltrar);
  }

  EjecutarFiltro($event:any){
    $event.stopPropagation();
    this.FiltroFechasForm.forEach((formGroup,index) => {
      if(this.ValidarCamposVacios(formGroup,index)){
        formGroup.setErrors({'FaltaData':true});
      }else{
        formGroup.setErrors({'FaltaData':false});
        formGroup.updateValueAndValidity();
      }
  });
  this.EnviarFormulario();
}


  ValidarCamposVacios(form: FormGroup,index:number){
    //Tiene Start mas no End
   if((form.get('start').value && form.get('start').value != '') 
       && (!form.get('end').value || form.get('end').value == '')){
        return true;
    }
    //Tiene end mas no Start
    if((form.get('end').value && form.get('end').value != '') 
    && (!form.get('start').value || form.get('start').value == '')){
      return true;
    }
       //Ni start ni end
    if((!form.get('end').value || form.get('end').value == '') 
     && (!form.get('start').value || form.get('start').value == '')){
      return false;
    }
    this.FiltroFechasFormSinVacios.push({Formulario:form,nombreTabla:this.CamposAFiltrar[index].nombreTabla});
    return false;
  }

  EnviarFormulario = ()=>{
    let todoValido: boolean = true;
    this.FiltroFechasFormSinVacios.forEach((element,index) => {
        if(!element.Formulario.valid){
          todoValido = false;
        }else{
          this.CamposParseados.push({
            nombreTabla: this.CamposAFiltrar[index].nombreTabla,
            rango: {
              start: DateHelper.FormatearFecha(element.Formulario.value.start),
              end: DateHelper.FormatearFecha(element.Formulario.value.end)
            }
        })
        }
    });
    if(todoValido && this.CamposParseados.length>0){
       this.EnviarFiltroFecha.emit(this.CamposParseados); 
       this.CamposParseados =[];
       this.FiltroFechasFormSinVacios = [];
    }
  }

  
}
