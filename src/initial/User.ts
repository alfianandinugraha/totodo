import { getFirebaseTimestamp } from '@/utils/firebase'
import { User } from 'Types'

const initialUser: User = {
  fullname: '',
  email: '',
  uid: '',
  createdAt: getFirebaseTimestamp(),
  updatedAt: getFirebaseTimestamp(),
}

export default initialUser
