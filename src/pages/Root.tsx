import React, { ReactElement, useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import firebase from '@/utils/firebase'
import AuthContext from '@/store/AuthContext'
import UserContext from '@/store/UserContext'
import { User } from 'Types'
import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'

export default function Root(): ReactElement {
  const { isLoggedIn, setIsLoggedIn, setIsAuthLoading } = useContext(
    AuthContext
  )
  const { setUserInfo, setIsUserInfoLoading } = useContext(UserContext)

  useEffect(() => {
    setIsUserInfoLoading(true)
    setIsAuthLoading(true)
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
      setIsAuthLoading(false)

      if (user) {
        firebase
          .firestore()
          .collection('users')
          .where('uid', '==', user.uid)
          .get()
          .then((val) => {
            const [userInfoResult] = val.docs.map((doc) => doc.data()) as User[]
            setUserInfo(userInfoResult)
            setIsUserInfoLoading(false)
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
