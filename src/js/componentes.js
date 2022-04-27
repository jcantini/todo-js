import { Todo } from '../classes';
import { todoList } from '../index'

// Referencias en el Html
const divTodoList   = document.querySelector( '.todo-list' );
const ulFilters     = document.querySelector( '.filters' );
const txtInput      = document.querySelector( '.new-todo' );
const btnBorroCom   = document.querySelector( '.clear-completed' );
const anchorFiltros = document.querySelectorAll( '.filtro' );

export const crearTodoHtml = ( todo ) => { 

    const htmlTodo = `
        <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild ); // Esto es para que no agrege el div sino directamente el li

    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener('keyup', ( event ) => {   // event me pasa la tecla presionada
    if( event.keyCode === 13 && txtInput.value.length > 0 ) { // keyCode es una propiedad de event y el 13 es el codigo de la tecla Enter
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value = ''
    }

});

divTodoList.addEventListener('click', ( event ) => {
    const nombreElemento = event.target.localName; // Devuelve input, label o button

    const todoElemento   = event.target.parentElement.parentElement; // El 2er parentElement devuelve el div
                                                        // el 2do devuelve el li donde voy a tener el id 

    const todoId        = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ) { // Hizo click en el checkbox
        todoList.marcarCompletado( todoId ); // Marco o desmarco como completado 
        todoElemento.classList.toggle('completed') ;
        // classList me trae todas las clases y toggle es para que dentro de esta lista de clases 
        // se agregue o quite la clase que indico.

    } else if ( nombreElemento.includes('button') ) { // Tengo que borrar la tarea. Esto solo lo borra del []
        todoList.eliminarTodo( todoId );             // Falta elliminarlo del html
        divTodoList.removeChild( todoElemento );
    }
    console.log(todoList);
})

 btnBorroCom.addEventListener('click', () => { // En este caso no me interesa recibir el evento
    todoList.eliminarCompletados(); // Esto solo lo elimina del arreglo
    // Los remuevo del html
    for( let i = divTodoList.children.length-1; i>=0 ; i--) {
        const elemento = divTodoList.children[i];
        // Si tiene la clase completed, esta completado
        if(elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
 })

 ulFilters.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if ( !filtro ) { return; }

    // le saco a todos los filtros, la clase que le coloca el recuadrado de opcion seleccionada
    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    
    event.target.classList.add('selected');

    // y le coloco el recuadro solo al filtro seleccionado

    for( const elemento of divTodoList.children) {
        elemento.classList.remove('hidden') //clase que tengo en el css para que no se vea lo que no quiero
        const completado = elemento.classList.contains('completed') // veo si el elemento esta completado

        switch( filtro ) {
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
 })