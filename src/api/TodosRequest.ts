import firebase from '@/utils/firebase'
import { Todo, TodoBody, User } from 'Types'

const fetchTodosRequest = (
  user: User
): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> =>
  firebase
    .firestore()
    .collection('todos')
    .where('uid', '==', user.uid)
    .orderBy('todoId', 'desc')
    .get()

const deleteTodoRequest = (todo: Todo): Promise<void> =>
  firebase.firestore().collection('todos').doc(todo.docId).delete()

const finishTodoRequest = (todo: Todo): Promise<void> =>
  firebase.firestore().collection('todos').doc(todo.docId).update({
    todoId: todo.docId,
    description: todo.description,
    uid: todo.uid,
    isFinish: !todo.isFinish,
  })

const updateTodoRequest = (todo: Todo): Promise<void> =>
  firebase.firestore().collection('todos').doc(todo.docId).update({
    todoId: todo.docId,
    description: todo.description,
    uid: todo.uid,
    isFinish: todo.isFinish,
  })

const addTodoRequest = (
  todo: TodoBody
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => firebase.firestore().collection('todos').add(todo)

export {
  fetchTodosRequest,
  deleteTodoRequest,
  finishTodoRequest,
  addTodoRequest,
  updateTodoRequest,
}
