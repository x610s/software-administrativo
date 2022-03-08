export class Proyecto {
    id:number;
    fecha_inicio:Date;
    fecha_estimada: Date;
    nombre: string;
    descripcion:string; 
    localidad:string;
    localidadId:number;
    responsable:string;
    responsableId:number;
    status:boolean;
    constructor(id?:number,fecha_inicio?:Date,fecha_estimada?:Date,nombre?:string,
        descripcion?:string,localidad?:string,localidadId?:number,responsable?:string
        ,responsableId?:number,status?:boolean) {
        this.id = id;
        this.fecha_inicio = fecha_inicio;
        this.fecha_estimada = fecha_estimada;
        this.nombre= nombre;
        this.descripcion = descripcion;
        this.localidad = localidad;
        this.localidadId = localidadId;
        this.responsable = responsable;
        this.responsableId =responsableId;
        this.status = status;
    }
}