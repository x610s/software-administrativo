import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-proyectos-dialog',
  templateUrl: './proyectos-dialog.component.html',
  styleUrls: ['./proyectos-dialog.component.scss']
})
export class ProyectosDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
