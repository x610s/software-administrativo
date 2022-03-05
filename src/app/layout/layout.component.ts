import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit,AfterViewInit  {

  mobileQuery: MediaQueryList;
  @ViewChild('snav') public sidenav: MatSidenav;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width:768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change',this._mobileQueryListener)
     this.mobileQuery.onchange = () => this.onAbrirSidenav();
  }
 
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(()=>{
    this.onStartMobile();
    })
  }

  private _mobileQueryListener: () => void;


  
  
  onAbrirSidenav(){
    if(!this.mobileQuery.matches && this.sidenav ){
      this.sidenav.open();
     }
  }
  onStartMobile(){
    if(this.mobileQuery.matches && this.sidenav){
      this.sidenav.close();
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change',this._mobileQueryListener);
  }

  onMostrarSideNav($event){
    this.sidenav.toggle();
  }

}
