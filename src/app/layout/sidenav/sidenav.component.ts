import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  rutas:any[] = [
    {url: '/proyectos',ruta: 'Proyectos'},
    {url: '/localidades',ruta: 'Localidades'},
    {url: '/responsables',ruta: 'Responsables'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
