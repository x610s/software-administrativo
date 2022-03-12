import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-option-menu',
  templateUrl: './table-option-menu.component.html'
})
export class TableOptionMenuComponent implements OnInit {
  @Input() ProyectoId: number;
  @Input() Status: number;
  @Input() TipoMenu: string;
  @Output() DispararCambioEvent= new EventEmitter<any>();
  @Output() RegistroModificado = new EventEmitter<object>();
  @Output() RegistroEliminado = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDisparaCambioTabla(){
    this.DispararCambioEvent.emit(true);
  }

  OnRegistroModificado($event:object){
      this.RegistroModificado.emit($event);
  }

  OnRegistroEliminado($event:number){
      this.RegistroEliminado.emit($event);
  }
}
