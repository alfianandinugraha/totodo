import { createContext } from 'react'

interface AuthContextProps {
  isLoggedIn: boolean
  isAuthLoading: boolean
  setIsLoggedIn: (status: boolean) => void
  setIsAuthLoading: (status: boolean) => void
}

const initialAuthContext: AuthContextProps = {
  isLoggedIn: false,
  isAuthLoading: true,
  setIsLoggedIn: () => {},
  setIsAuthLoading: () => {},
}

const AuthContext = createContext<AuthContextProps>(initialAuthContext)

const updateAuth = (initialState: boolean, newState: boolean): boolean =>
  newState
const updateIsAuthLoading = (
  initalState: boolean,
  newState: boolean
): boolean => newState

export default AuthContext
export { updateAuth, updateIsAuthLoading }
