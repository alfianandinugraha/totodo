import firebase from '@/utils/firebase'
import { User } from 'Types'

const updateUserRequest = (user: User): Promise<void> =>
  firebase
    .firestore()
    .collection('users-v2')
    .doc(user.uid)
    .update({
      fullname: user.fullname,
      email: user.email,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    })

export { updateUserRequest }
