import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// Por cada elemento del array todoList, muesto la tarea en pantalla
todoList.todos.forEach( todo => crearTodoHtml( todo ) );