import firebase from '@/utils/firebase'
import { User } from 'Types'

const updateUserRequest = (user: User): Promise<void> =>
  firebase.firestore().collection('users').doc(user.docId).update({
    uid: user.uid,
    fullname: user.fullname,
    email: user.email,
  })

export { updateUserRequest }
