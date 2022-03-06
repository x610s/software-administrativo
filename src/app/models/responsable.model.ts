export class Responsable {
    id:number;
    nombre:string;
    correo:string;
    telefono:string;
    constructor(id?:number,nombre?:string,correo?:string,telefono?:string) {
       this.id = id;
       this.nombre = nombre;
       this.correo = correo;
       this.telefono = telefono;
    }
}