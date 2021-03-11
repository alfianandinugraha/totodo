import AuthContext from '@/store/AuthContext'
import { Button, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, ReactElement } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from '@/utils/firebase'
import initialUser from '@/initial/User'
import UserContext from '@/store/UserContext'

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))

const HeaderDashboard = (): ReactElement => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const { setUserInfo, setIsUserInfoLoading } = useContext(UserContext)
  const history = useHistory()
  const classes = useStyles()

  const signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false)
        setUserInfo(initialUser)
        setIsUserInfoLoading(true)
        history.push('/login')
      })
  }

  return (
    <div className={classes.header}>
      <Typography variant="h3">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Totodo
        </Link>
      </Typography>
      {isLoggedIn && (
        <Button variant="contained" color="secondary" onClick={signOutHandler}>
          Keluar
        </Button>
      )}
    </div>
  )
}

export default HeaderDashboard
