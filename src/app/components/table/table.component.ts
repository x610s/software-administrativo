import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  rowName: string[];
  header: string[];
  rowType: string[];
  Ids:number[];
  @Input() Data:any[];
  @Input() displayedColumns: object[];
  @Input() TipoTablaOpciones: string = "";
  @Input() totalPaginas:number;
  @Input() TotalRegistros:number;
  @Input() PageIndex:number =0;
  @Output() EmitirCambioPagina = new EventEmitter<number>();
  @Output() RefrescarTable = new EventEmitter<true>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public dialog: MatDialog) { 
  }

  ngOnInit(): void {
   this.header = this.displayedColumns.map(x=> x['header']);
   this.rowName = this.displayedColumns.map(x=> x['row']['name']);
   this.rowType = this.displayedColumns.map(x=> x['row']['type']);
   if(this.Data.length>0){
    this.Ids = this.Data.map(x=> x.id);
   }
  }

  ngAfterViewInit() {
    if(this.Data && this.Data.length>0){
      this.dataSource = new MatTableDataSource(this.Data)
      this.dataSource.paginator = this.paginator;
      Promise.resolve().then(()=>{
        this.paginator.pageIndex = this.PageIndex-1? this.PageIndex-1:0;
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

  OnRegistroModificado = ($event:object) =>{
    if($event[0] && $event[0].id){
      let index = this.Ids.indexOf($event[0].id);
      if(index > -1){
       this.table.dataSource[index] = $event[0];
       this.table.renderRows();
      }
    }
  }

  OnRegistroEliminado = (id:number) =>{
    if(id){
      let index = this.Ids.indexOf(Number(id));
      if(index > -1){
       this.table.dataSource = this.Data.filter(x=> x.id != Number(id));
       this.Data = this.Data.filter(x=> x.id != Number(id));
       if(this.Data.length == 0){
         console.log(`Page index = ${this.PageIndex}`);
         console.log(`Paginator Pageindex = ${this.paginator.pageIndex}`);
         console.log("-------------------------------");
         this.paginator.pageIndex = this.PageIndex-1 == -1? 0 :this.PageIndex-1;
         this.PageIndex = this.PageIndex-1 == -1? 0 :this.PageIndex-1;
         console.log(`Page index = ${this.PageIndex}`);
         console.log(`Paginator Pageindex = ${this.paginator.pageIndex}`);
        this.EmitirCambioPagina.emit(this.PageIndex) // validar que no sea-1;
       }
       this.Ids = this.Ids.filter( x => x !=Number(id));
       this.TotalRegistros = this.TotalRegistros-1;
       this.paginator.length = this.TotalRegistros
        this.table.renderRows();
      }
    }
  }

}
