import { createContext } from 'react'

export interface User {
  uid: string
  fullname: string
  email: string
}

interface AuthContextProps {
  isLoggedIn: boolean
  setIsLoggedIn: (status: boolean) => void
  userInfo: User
  setUserInfo: (user: User) => void
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: {
    fullname: '',
    email: '',
    uid: '',
  },
  setUserInfo: () => {},
})

const updateAuth = (initialState: boolean, newState: boolean): boolean =>
  newState
const updateUserInfo = (initalState: User, newState: User): User => newState

export default AuthContext
export { updateAuth, updateUserInfo }
