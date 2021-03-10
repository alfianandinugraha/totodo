import { createContext } from 'react'

interface AuthContextProps {
  isLoggedIn: boolean
  setIsLoggedIn: (status: boolean) => void
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
})

const updateAuth = (initialState: boolean, newState: boolean): boolean =>
  newState

export default AuthContext
export { updateAuth }
