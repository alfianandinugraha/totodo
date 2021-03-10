import React, { ReactElement, useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import firebase from '@/utils/firebase'
import AuthContext from '@/store/AuthContext'
import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'

export default function Root(): ReactElement {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
    })
  }, [])

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        {isLoggedIn ? <Redirect to="/" /> : <Register />}
      </Route>
    </Switch>
  )
}
