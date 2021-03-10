import React, { ReactElement, useReducer } from 'react'
import { HashRouter } from 'react-router-dom'
import Root from './pages/Root'
import AuthContext, { updateAuth, updateUserInfo } from './store/AuthContext'

const App = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useReducer(updateAuth, false)
  const [userInfo, setUserInfo] = useReducer(updateUserInfo, {
    fullname: '',
    email: '',
    uid: '',
  })

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}
    >
      <HashRouter>
        <Root />
      </HashRouter>
    </AuthContext.Provider>
  )
}

export default App
