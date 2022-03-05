import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {

  @Output() SideNavEvent= new EventEmitter<boolean>();
  @Input() mobileQueryMatch:boolean;
  constructor() { }
  
  ngOnInit(): void {
  }

  onMostrarSideNav($event){
    this.SideNavEvent.emit(true);
  }

}
