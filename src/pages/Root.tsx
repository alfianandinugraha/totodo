import React, { ReactElement, useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import firebase, { USERS_COLLECTION } from '@/utils/firebase'
import AuthContext from '@/store/AuthContext'
import UserContext from '@/store/UserContext'
import { UserBody } from 'Types'
import initialUser from '@/initial/User'
import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'
import ProfilePage from './Profile'
import ProtectedPage from './helpers/ProtectedPage'

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
          .collection(USERS_COLLECTION)
          .doc(user.uid)
          .get()
          .then((val) => {
            const userData = {
              ...initialUser,
              ...(val.data() as UserBody),
              uid: user.uid,
            }
            if (!userData) return
            console.log(userData)
            setUserInfo(userData)
            setIsUserInfoLoading(false)
          })
      }
    })
  }, [])

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/profile">
        <ProtectedPage>
          <ProfilePage />
        </ProtectedPage>
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
