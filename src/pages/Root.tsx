import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'

export default function Root(): ReactElement {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  )
}
