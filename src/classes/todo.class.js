

export class Todo {

    constructor( tarea ) {

        this.tarea = tarea;

        this.id    = new Date().getTime(); // obtengo algo como 732483249
        this.completado = false;
        this.creado = new Date();

    }
}