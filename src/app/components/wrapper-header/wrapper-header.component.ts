import { MultiFilterSearch } from './../../models/interfaces/MultiFilter-Search';
import { MultiSelect } from './../../models/interfaces/Multi-Select';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wrapper-header',
  templateUrl: './wrapper-header.component.html',
  styleUrls: ['./wrapper-header.component.scss']
})
export class WrapperHeaderComponent implements OnInit {

  SearchMode:boolean = false;
  TieneSearch:boolean = true;
  TerminoBusqueda: string = "";
  CamposFormControl = new FormControl();
  @Input() texto;
  @Input() CamposParaFiltrar:MultiSelect[] = [];
  @Output() EmitirBusqueda = new EventEmitter<MultiFilterSearch>();
  @Output() LimpiarBusqueda = new EventEmitter<true>();


  constructor() { }

  ngOnInit(): void {
  }

  onMostrarInputBuscar(){
    this.SearchMode = !this.SearchMode;
    this.TerminoBusqueda = "";
  }

  onBuscar(){
      if(this.TerminoBusqueda.trim() !== '' && !this.SinCamposSeleccionados()){
       let multiFiltro : MultiFilterSearch ={
          campos:this.CamposFormControl.value,
          termino: this.TerminoBusqueda,
       };
        this.EmitirBusqueda.emit(multiFiltro)
     }else{
       this.CamposFormControl.reset();
       this.LimpiarBusqueda.emit(true);
     } 
  }

  SinCamposSeleccionados(){
    return (Array.isArray(this.CamposFormControl.value) == true
     && this.CamposFormControl.value.length==0)
    || this.CamposFormControl.value ==null;
  }
  
}
