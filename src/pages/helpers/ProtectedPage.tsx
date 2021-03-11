import AuthContext from '@/store/AuthContext'
import React, { ReactElement, useContext } from 'react'
import { Redirect } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function ProtectedPage({ children }: Props): ReactElement {
  const { isLoggedIn, isAuthLoading } = useContext(AuthContext)

  if (isAuthLoading) return <></>

  return isLoggedIn ? <>{children}</> : <Redirect to="/login" />
}
