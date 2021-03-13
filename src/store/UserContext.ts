import { createContext } from 'react'
import { User, AuthContextProps } from 'Types'
import initialUser from '@/initial/User'

const intialUserContext: AuthContextProps = {
  userInfo: initialUser,
  isUserInfoLoading: true,
  setUserInfo: () => {},
  setIsUserInfoLoading: () => {},
}

const UserContext = createContext<AuthContextProps>(intialUserContext)

const updateUserInfo = (initalState: User, newState: User): User => newState
const updateIsLoadingUserInfo = (
  initialState: boolean,
  newState: boolean
): boolean => newState

export { updateUserInfo, updateIsLoadingUserInfo, initialUser }
export default UserContext
