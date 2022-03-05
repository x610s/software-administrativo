import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss']
})
export class MenuButtonsComponent implements OnInit {
  @Input() texto:string;
  @Input() url : string;
  constructor() { }

  ngOnInit(): void {
  }

}
