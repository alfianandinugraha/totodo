import { Todo } from 'Types'

const initialTodo: Todo = {
  uid: '',
  description: '',
  todoId: '',
  isFinish: false,
  docId: '',
}

const initialTodos: Todo[] = [initialTodo, initialTodo, initialTodo]

export { initialTodo, initialTodos }
