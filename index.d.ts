import firebase from 'firebase'

declare module 'Types' {
  export interface UserBody {
    fullname: string
    email: string
    createdAt: {
      seconds: number
      nanoseconds: number
    }
    updatedAt: {
      seconds: number
      nanoseconds: number
    }
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
  }

  export interface Todo extends TodoBody {
    docId: string
  }
}
