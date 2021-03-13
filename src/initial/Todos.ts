import { Todo } from 'Types'
import firebase from '@/utils/firebase'

const initialTodo: Todo = {
  uid: '',
  description: '',
  todoId: '',
  isFinish: false,
  docId: '',
  createdAt: new firebase.firestore.Timestamp(0, 0),
  updatedAt: new firebase.firestore.Timestamp(0, 0),
}

const initialTodos: Todo[] = [initialTodo, initialTodo, initialTodo]

export { initialTodo, initialTodos }
