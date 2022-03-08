import { ProyectosDialogComponent } from './../modals/proyectos-dialog/proyectos-dialog.component';
import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  rowName: string[];
  header: string[];
  rowType: string[];
  @Input() Data:any[];
  @Input() displayedColumns: object[];
  @Input() TipoTablaOpciones: string = "";
  @Input() totalPaginas:number;
  @Input() TotalRegistros:number;
  @Output() EmitirCambioPagina = new EventEmitter<number>();
  @Output() RefrescarTable = new EventEmitter<true>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) { 
  }

  ngOnInit(): void {
   this.header = this.displayedColumns.map(x=> x['header']);
   this.rowName = this.displayedColumns.map(x=> x['row']['name']);
   this.rowType = this.displayedColumns.map(x=> x['row']['type']);
  }

  ngAfterViewInit() {
    console.log("Me Pinto")
    if(this.Data){
      this.dataSource = new MatTableDataSource(this.Data)
      this.dataSource.paginator = this.paginator;
      Promise.resolve().then(()=>{
        this.paginator.length = this.TotalRegistros// el total de registros
        this.paginator.pageSize = 6 //Cantidad Registro por pagina
      })

    }
  }

  OnCambioPagina = ($event:PageEvent) =>{
    this.EmitirCambioPagina.emit($event.pageIndex+1);
  }

  OnRecibirCambioTable = ($event:any) => {
    this.RefrescarTable.emit(true);
  }

}
