import firebase, {
  getFirebaseTimestamp,
  TODOS_COLLECTION,
} from '@/utils/firebase'
import { Todo, TodoBody, User } from 'Types'

const fetchTodosRequest = (
  user: User
): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> =>
  firebase
    .firestore()
    .collection(TODOS_COLLECTION)
    .where('uid', '==', user.uid)
    .orderBy('createdAt', 'desc')
    .get()

const deleteTodoRequest = (todo: Todo): Promise<void> =>
  firebase.firestore().collection(TODOS_COLLECTION).doc(todo.docId).delete()

const finishTodoRequest = (todo: Todo): Promise<void> =>
  firebase.firestore().collection(TODOS_COLLECTION).doc(todo.docId).update({
    todoId: todo.docId,
    description: todo.description,
    uid: todo.uid,
    isFinish: !todo.isFinish,
    updatedAt: getFirebaseTimestamp(),
  })

const updateTodoRequest = (todo: Todo): Promise<void> =>
  firebase.firestore().collection(TODOS_COLLECTION).doc(todo.docId).update({
    todoId: todo.docId,
    description: todo.description,
    uid: todo.uid,
    isFinish: todo.isFinish,
    updatedAt: getFirebaseTimestamp(),
  })

const addTodoRequest = (
  todo: TodoBody
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => firebase.firestore().collection(TODOS_COLLECTION).add(todo)

export {
  fetchTodosRequest,
  deleteTodoRequest,
  finishTodoRequest,
  addTodoRequest,
  updateTodoRequest,
}
