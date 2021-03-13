import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDqSDm9-irCNK9VkvkhGCfxsskPniyu3Yw',
  authDomain: 'learn-firebase-auth-a0adb.firebaseapp.com',
  projectId: 'learn-firebase-auth-a0adb',
  storageBucket: 'learn-firebase-auth-a0adb.appspot.com',
  messagingSenderId: '50350283624',
  appId: '1:50350283624:web:4cb47ed8df8ce77ea1d4dd',
}

const USERS_COLLECTION = 'users'
const TODOS_COLLECTION = 'todos'
const getFirebaseTimestamp = (
  PropsDate: Date = new Date()
): firebase.firestore.Timestamp =>
  firebase.firestore.Timestamp.fromDate(PropsDate)
const MAX_LENGTH_TODO_DESCRIPTION = 50

const checkMaxLengthTodoDescrition = (
  description: string
): { isValid: boolean; message: string } =>
  description.length > MAX_LENGTH_TODO_DESCRIPTION
    ? {
        isValid: false,
        message: `Maksimum adalah 50. ukurang sekarang ${description.length}`,
      }
    : {
        isValid: true,
        message: '',
      }

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export {
  USERS_COLLECTION,
  TODOS_COLLECTION,
  getFirebaseTimestamp,
  MAX_LENGTH_TODO_DESCRIPTION,
  checkMaxLengthTodoDescrition,
}
export default firebase
