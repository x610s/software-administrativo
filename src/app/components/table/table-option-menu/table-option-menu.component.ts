import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-option-menu',
  templateUrl: './table-option-menu.component.html',
  styleUrls: ['./table-option-menu.component.scss']
})
export class TableOptionMenuComponent implements OnInit {
  @Input() TipoMenu: string;
  @Output() DispararCambioEvent= new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onDisparaCambioTabla(){
    this.DispararCambioEvent.emit(true);
  }
}
