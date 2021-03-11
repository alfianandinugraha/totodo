import React, { ReactElement, useReducer } from 'react'
import { HashRouter } from 'react-router-dom'
import Root from './pages/Root'
import AuthContext, {
  updateAuth,
  updateIsAuthLoading,
} from './store/AuthContext'
import UserContext, {
  initialUser,
  updateIsLoadingUserInfo,
  updateUserInfo,
} from './store/UserContext'

const App = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useReducer(updateAuth, false)
  const [isAuthLoading, setIsAuthLoading] = useReducer(
    updateIsAuthLoading,
    true
  )
  const [isUserInfoLoading, setIsUserInfoLoading] = useReducer(
    updateIsLoadingUserInfo,
    true
  )
  const [userInfo, setUserInfo] = useReducer(updateUserInfo, initialUser)

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isAuthLoading, setIsAuthLoading }}
    >
      <UserContext.Provider
        value={{
          isUserInfoLoading,
          setIsUserInfoLoading,
          userInfo,
          setUserInfo,
        }}
      >
        <HashRouter>
          <Root />
        </HashRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
