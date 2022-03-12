import { Proyecto } from './../../../../models/proyecto.model';
import { ProyectosService } from './../../../../services/proyectos.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-proyectos-table-option',
  templateUrl: './proyectos-table-option.component.html'
})
export class ProyectosTableOptionComponent implements OnInit {

  @Input() ProyectoId: number; 
  @Input() Status: number;
  @Output() RegistroModificado = new EventEmitter<Proyecto>();
  @Output() RegistroEliminado = new EventEmitter<number>();

  constructor(private proyectoService:ProyectosService) { }

  ngOnInit(): void {
  }

  Eliminar=()=>{
    this.proyectoService.Eliminar(this.ProyectoId).subscribe(
      (resp:number) =>{
        this.RegistroEliminado.emit(resp);
      },
      (e)=>{
        console.log(e);
      }
    )
  }

  CambiarEstado=()=>{
    this.proyectoService.CambiarEstado(this.ProyectoId,this.Status).subscribe(
      (resp:any)=>{
        this.RegistroModificado.emit(resp);
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }

  VerDescripcion=()=>{

  }

}
