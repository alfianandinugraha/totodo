import React, { ReactElement, useReducer } from 'react'
import { HashRouter } from 'react-router-dom'
import Root from './pages/Root'
import AuthContext, { updateAuth } from './store/AuthContext'

const App = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useReducer(updateAuth, false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <HashRouter>
        <Root />
      </HashRouter>
    </AuthContext.Provider>
  )
}

export default App
