import firebase, { USERS_COLLECTION } from '@/utils/firebase'
import { User } from 'Types'

const updateUserRequest = (user: User): Promise<void> =>
  firebase
    .firestore()
    .collection(USERS_COLLECTION)
    .doc(user.uid)
    .update({
      fullname: user.fullname,
      email: user.email,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    })

export { updateUserRequest }
