import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() Data:any[];
  @Input() displayedColumns: string[];
  @Input() totalPaginas:number;
  @Input() TotalRegistros:number;
  @Output() EmitirCambioPagina = new EventEmitter<number>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log("Me Llaman view")
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

}
