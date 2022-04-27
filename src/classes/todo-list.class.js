
export class TodoList {

    constructor() {

    //    this.todos = [];
        this.cargarDelLocalStorage();

    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {
       this.todos = this.todos.filter( todo => todo.id !== id )
       this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for( const todo of this.todos) {
            if (todo.id === parseInt( id )) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }

    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => todo.completado === false ) // Regresa los que estan pendientes
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        // como el local storage solo admite strings y todos es un objeto por lo que necesito 
        // convertirlo a json para que el objeto quede formateado en string 
        localStorage.setItem('todo', JSON.stringify( this.todos ));
    }

    cargarDelLocalStorage() {

        // if(localStorage.getItem('todo') ) {
        //     this.todos = JSON.parse(localStorage.getItem('todo')); // Para volver a convertir el json en el objeto original
        // } else{
        //     this.todos = [];
        // }
        // Lo anterior lo presumo asi:
        this.todos = (localStorage.getItem('todo') ) ? JSON.parse(localStorage.getItem('todo')) : [];

        // Cuando ecupero del local storage, recupero los todos como objetos, no como instancias de la clase por lo que
        // pierden los metodos.
    }
}