import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'StatusPipe'
})
export class StatusPipePipe implements PipeTransform {

  transform(value: boolean, args?: any): any {
    if(value){
      return ""
    }else{
      return ""
    }
  }

}
