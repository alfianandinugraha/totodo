import firebase from '@/utils/firebase'
import { User } from 'Types'

const fetchTodosRequest = (
  user: User
): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> =>
  firebase.firestore().collection('todos').where('uid', '==', user.uid).get()

const addTodoRequest = (): void => {}

export { fetchTodosRequest, addTodoRequest }
