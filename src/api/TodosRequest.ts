import firebase from '@/utils/firebase'
import { Todo, User } from 'Types'

const fetchTodosRequest = (
  user: User
): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> =>
  firebase.firestore().collection('todos').where('uid', '==', user.uid).get()

const deleteTodoRequest = (todo: Todo): Promise<void> =>
  firebase.firestore().collection('todos').doc(todo.docId).delete()

export { fetchTodosRequest, deleteTodoRequest }
