import { formatDate } from "@angular/common";

export class DateHelper {

   public static FormatearFecha =(fecha: Date): string =>{
        let format = 'yyyy-MM-dd'
        const locale = 'en-US';
        return formatDate(fecha, format, locale);
    }
}
