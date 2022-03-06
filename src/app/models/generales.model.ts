export class Paginacion {
    
    pagina:number = 1;
    cantidadRegistrosPorPagina:number = 6;
    totalRegistros:number;
    totalPaginas:number;
    contenidoPagina: object | any;

    constructor(pagina?:number,cantidadRegistrosPorPagina?:number,totalRegistros?:number,totalPaginas?:number,
        contenidoPagina?:object|any) {   
        this.pagina = pagina;
        this.cantidadRegistrosPorPagina = cantidadRegistrosPorPagina;
        this.totalRegistros = totalRegistros;
        this.totalPaginas = totalPaginas;
        this.contenidoPagina = contenidoPagina;
    }
}

export class BuscarPagina {
    pagina:number;
    cantidadRegistrosPorPagina:number;
    constructor(pagina:number,reigistros?:number) {   
        this.pagina = pagina;
        this.cantidadRegistrosPorPagina =reigistros;
    }
}
