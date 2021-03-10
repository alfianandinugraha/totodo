import React, { ReactElement, useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import firebase from '@/utils/firebase'
import AuthContext, { User } from '@/store/AuthContext'
import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'

export default function Root(): ReactElement {
  const { isLoggedIn, setIsLoggedIn, setUserInfo } = useContext(AuthContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)

      if (user) {
        firebase
          .firestore()
          .collection('users')
          .where('uid', '==', user.uid)
          .get()
          .then((val) => {
            const [userInfoResult] = val.docs.map((doc) => doc.data()) as User[]
            setUserInfo(userInfoResult)
            console.log(userInfoResult)
          })
      }
    })
  }, [])

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        {isLoggedIn ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/register">
        {isLoggedIn ? <Redirect to="/" /> : <Register />}
      </Route>
    </Switch>
  )
}
