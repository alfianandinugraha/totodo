import firebase from 'firebase'

declare module 'Types' {
  export interface Timestamp {
    seconds: number
    nanoseconds: number
  }

  export interface UserBody {
    fullname: string
    email: string
    createdAt: Timestamp
    updatedAt: Timestamp
  }

  export interface User extends UserBody {
    uid: string
  }

  export interface AuthContextProps {
    userInfo: User
    isUserInfoLoading: boolean
    setUserInfo: (user: User) => void
    setIsUserInfoLoading: (status: boolean) => void
  }

  export interface TodoBody {
    todoId: string
    description: string
    uid: string
    isFinish: boolean
    createdAt: firebase.firestore.Timestamp
    updatedAt: firebase.firestore.Timestamp
  }

  export interface Todo extends TodoBody {
    docId: string
  }
}
